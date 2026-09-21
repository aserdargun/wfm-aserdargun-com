import { catalogSchema } from "./schema";
import type { Catalog, CatalogIssue } from "./types";

const publicEntityIds = (catalog: Catalog) => [
  ...catalog.concepts.map(({ id }) => id),
  ...catalog.models.map(({ id }) => id),
  ...catalog.milestones.map(({ id }) => id),
  ...catalog.signals.map(({ id }) => id),
];

const isIsoDate = (value: string) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
};

const issue = (code: CatalogIssue["code"], path: string, message: string): CatalogIssue => ({ code, path, message });

export function validateCatalog(catalog: Catalog): CatalogIssue[] {
  const issues: CatalogIssue[] = [];
  const parsed = catalogSchema.safeParse(catalog);
  if (!parsed.success) {
    for (const failure of parsed.error.issues) {
      issues.push(issue("SCHEMA_INVALID", failure.path.join("."), failure.message));
    }
    // Stop before traversing structurally invalid data.
    return issues;
  }

  const collections = [
    ["sources", catalog.sources],
    ["evidence", catalog.evidence],
    ["claims", catalog.claims],
    ["concepts", catalog.concepts],
    ["models", catalog.models],
    ["milestones", catalog.milestones],
    ["signals", catalog.signals],
    ["relations", catalog.relations],
  ] as const;

  for (const [name, entries] of collections) {
    const seen = new Set<string>();
    entries.forEach((entry, index) => {
      if (seen.has(entry.id)) issues.push(issue("DUPLICATE_ID", `${name}.${index}.id`, `Duplicate id: ${entry.id}`));
      seen.add(entry.id);
    });
  }

  const entities = new Set(publicEntityIds(catalog));
  const allEntityIds = publicEntityIds(catalog);
  if (new Set(allEntityIds).size !== allEntityIds.length) issues.push(issue("DUPLICATE_ID", "entities", "Public entity ids must be globally unique."));

  const evidenceIds = new Set(catalog.evidence.map(({ id }) => id));
  const sourceIds = new Set(catalog.sources.map(({ id }) => id));
  const claimIds = new Set(catalog.claims.map(({ id }) => id));

  catalog.claims.forEach((claim, index) => {
    if (claim.evidenceIds.length === 0) {
      issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `claims.${index}.evidenceIds`, `Claim ${claim.id} has no evidence.`));
    }
    if (claim.evidenceIds.some((id) => !evidenceIds.has(id))) {
      issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `claims.${index}.evidenceIds`, `Claim ${claim.id} references missing evidence.`));
    }
    if ((claim.evidenceStatus === "inferred" || claim.evidenceStatus === "editorial-synthesis") && !claim.rationale?.trim()) {
      issues.push(issue("RATIONALE_REQUIRED", `claims.${index}.rationale`, `Claim ${claim.id} requires a curator rationale.`));
    }
    if (!entities.has(claim.subjectId)) {
      issues.push(issue("ORPHAN_RELATION", `claims.${index}.subjectId`, `Unknown claim subject: ${claim.subjectId}`));
    }
  });

  catalog.evidence.forEach((evidence, index) => {
    if (!sourceIds.has(evidence.sourceId)) {
      issues.push(issue("SCHEMA_INVALID", `evidence.${index}.sourceId`, `Unknown source: ${evidence.sourceId}`));
    }
    if (evidence.supportedClaimIds.some((id) => !claimIds.has(id))) {
      issues.push(issue("SCHEMA_INVALID", `evidence.${index}.supportedClaimIds`, "Evidence references an unknown claim."));
    }
  });

  catalog.relations.forEach((relation, index) => {
    if (!entities.has(relation.sourceId) || !entities.has(relation.targetId)) {
      issues.push(issue("ORPHAN_RELATION", `relations.${index}`, `Relation ${relation.id} has an unknown endpoint.`));
    }
  });

  const checkReferences = (path: string, entityRefs: string[], evidenceRefs: string[]) => {
    if (!entityRefs.length || entityRefs.some((id) => !entities.has(id))) {
      issues.push(issue("ORPHAN_RELATION", path, "Public records require existing entities."));
    }
    if (!evidenceRefs.length || evidenceRefs.some((id) => !evidenceIds.has(id))) {
      issues.push(issue("CLAIM_EVIDENCE_REQUIRED", path, "Public records require existing primary-source evidence."));
    }
  };
  catalog.milestones.forEach((entry, index) => checkReferences(`milestones.${index}`, entry.entityIds, entry.evidenceIds));
  catalog.signals.forEach((entry, index) => checkReferences(`signals.${index}`, entry.affectedEntityIds, entry.evidenceIds));
  [...catalog.concepts, ...catalog.models].forEach((entry, index) => {
    if (!catalog.claims.some((claim) => claim.subjectId === entry.id)) issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `entities.${index}`, "Concepts and models require a sourced claim."));
  });
  catalog.claims.forEach((claim, index) => {
    if (claim.evidenceIds.some((id) => !catalog.evidence.find((entry) => entry.id === id)?.supportedClaimIds.includes(claim.id))) {
      issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `claims.${index}`, "Evidence must explicitly support the referencing claim."));
    }
  });
  catalog.evidence.forEach((entry, index) => {
    if (entry.supportedClaimIds.some((id) => !catalog.claims.find((claim) => claim.id === id)?.evidenceIds.includes(entry.id))) {
      issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `evidence.${index}`, "Supported claims must reference this evidence."));
    }
  });

  catalog.sources.forEach((source, index) => {
    if (!source.expectedEntityIds.length || source.expectedEntityIds.some((id) => !entities.has(id))) {
      issues.push(issue("ORPHAN_RELATION", `sources.${index}.expectedEntityIds`, "Sources must identify existing entities."));
    }
  });
  catalog.claims.forEach((claim, index) => {
    for (const id of claim.evidenceIds) {
      const evidence = catalog.evidence.find((entry) => entry.id === id);
      const source = catalog.sources.find((entry) => entry.id === evidence?.sourceId);
      if (source && !source.expectedEntityIds.includes(claim.subjectId)) {
        issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `claims.${index}`, "The primary source does not cover the claim subject."));
      }
      if (claim.verificationState === "current" && evidence && evidence.verificationState !== "current") {
        issues.push(issue("SCHEMA_INVALID", `claims.${index}.verificationState`, "Current claims cannot depend on evidence awaiting review, stale evidence, or withdrawn evidence."));
      }
    }
  });
  catalog.signals.forEach((signal, index) => {
    const covered = new Set(signal.evidenceIds.flatMap((id) => {
      const evidence = catalog.evidence.find((entry) => entry.id === id);
      return catalog.sources.find((entry) => entry.id === evidence?.sourceId)?.expectedEntityIds ?? [];
    }));
    if (signal.affectedEntityIds.some((id) => !covered.has(id))) {
      issues.push(issue("CLAIM_EVIDENCE_REQUIRED", `signals.${index}`, "Signal evidence must cover its affected entities."));
    }
  });

  catalog.signals.forEach((signal, index) => {
    if (!signal.approved) issues.push(issue("SIGNAL_NOT_APPROVED", `signals.${index}.approved`, `Signal ${signal.id} is not approved.`));
  });

  const dateFields: Array<[string, string | null]> = [];
  catalog.sources.forEach((entry, index) => {
    dateFields.push([`sources.${index}.publicationDate`, entry.publicationDate], [`sources.${index}.lastChecked`, entry.lastChecked]);
  });
  catalog.models.forEach((entry, index) => dateFields.push([`models.${index}.releaseDate`, entry.releaseDate]));
  catalog.milestones.forEach((entry, index) => dateFields.push([`milestones.${index}.date`, entry.date]));
  catalog.signals.forEach((entry, index) => {
    dateFields.push(
      [`signals.${index}.discoveryDate`, entry.discoveryDate],
      [`signals.${index}.eventDate`, entry.eventDate],
      [`signals.${index}.publicationDate`, entry.publicationDate],
    );
  });
  for (const [path, value] of dateFields) {
    if (value !== null && !isIsoDate(value)) issues.push(issue("INVALID_DATE", path, `Invalid ISO calendar date: ${value}`));
  }

  catalog.models.forEach((model, modelIndex) => {
    Object.entries(model.capabilities).forEach(([key, value]) => {
      if (typeof value === "number" || /(?:score|rating|rank)$/i.test(key)) {
        issues.push(issue("FALSE_COMPARABILITY", `models.${modelIndex}.capabilities.${key}`, "Aggregate numeric scores are not permitted."));
      }
    });
  });

  const localeIds = [...publicEntityIds(catalog), ...catalog.claims.map(({ id }) => id)];
  for (const locale of ["en", "tr"] as const) {
    for (const id of localeIds) {
      const collection = claimIds.has(id) ? catalog.locales[locale].claims : catalog.locales[locale].entities;
      if (!collection[id]) issues.push(issue("LOCALE_PARITY", `locales.${locale}.${id}`, `Missing ${locale} content for ${id}.`));
    }
  }

  for (const locale of ["en", "tr"] as const) {
    const slugs = new Map<string, string>();
    for (const [id, content] of Object.entries(catalog.locales[locale].entities)) {
      const previous = slugs.get(content.slug);
      if (previous && previous !== id) issues.push(issue("LOCALE_PARITY", `locales.${locale}.entities.${id}.slug`, `Duplicate localized slug: ${content.slug}`));
      slugs.set(content.slug, id);
    }
  }

  return issues;
}

export function assertValidCatalog(catalog: Catalog): Catalog {
  const issues = validateCatalog(catalog);
  if (issues.length) {
    throw new AggregateError(issues.map((entry) => new Error(`${entry.code} at ${entry.path}: ${entry.message}`)), "Invalid catalog");
  }
  return catalog;
}
