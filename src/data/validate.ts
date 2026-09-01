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

  catalog.signals.forEach((signal, index) => {
    if (!signal.approved) issues.push(issue("SIGNAL_NOT_APPROVED", `signals.${index}.approved`, `Signal ${signal.id} is not approved.`));
  });

  const dateFields: Array<[string, string]> = [];
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
    if (!isIsoDate(value)) issues.push(issue("INVALID_DATE", path, `Invalid ISO calendar date: ${value}`));
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
