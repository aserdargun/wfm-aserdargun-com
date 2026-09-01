import { assertValidCatalog } from "./validate";
import type { Catalog, Claim, Evidence, Relation } from "./types";

export interface DerivedCatalog {
  catalog: Catalog;
  entityById: ReadonlyMap<string, Catalog["concepts"][number] | Catalog["models"][number] | Catalog["milestones"][number] | Catalog["signals"][number]>;
  claimById: ReadonlyMap<string, Claim>;
  evidenceById: ReadonlyMap<string, Evidence>;
  relationsBySource: ReadonlyMap<string, readonly Relation[]>;
  relationsByTarget: ReadonlyMap<string, readonly Relation[]>;
  claimsByEntity: ReadonlyMap<string, readonly Claim[]>;
  localeCounterpartSlugs: ReadonlyMap<string, string>;
  comparisonRows: readonly string[];
  routeManifest: readonly string[];
}

const groupBy = <T>(items: readonly T[], key: (item: T) => string) => {
  const grouped = new Map<string, T[]>();
  items.forEach((item) => grouped.set(key(item), [...(grouped.get(key(item)) ?? []), item]));
  return grouped;
};

export function deriveCatalog(catalog: Catalog): DerivedCatalog {
  assertValidCatalog(catalog);
  const entities = [...catalog.concepts, ...catalog.models, ...catalog.milestones, ...catalog.signals];
  const localeCounterpartSlugs = new Map<string, string>();
  for (const id of entities.map((entry) => entry.id)) {
    const en = catalog.locales.en.entities[id];
    const tr = catalog.locales.tr.entities[id];
    if (en && tr) {
      localeCounterpartSlugs.set(`en:${en.slug}`, tr.slug);
      localeCounterpartSlugs.set(`tr:${tr.slug}`, en.slug);
    }
  }
  const baseRoutes = ["", "concepts", "models", "evolution", "signals", "method"];
  const routes = (["en", "tr"] as const).flatMap((locale) => [
    ...baseRoutes.map((path) => `/${locale}${path ? `/${path}` : ""}`),
    ...catalog.concepts.map(({ id }) => `/${locale}/concepts/${catalog.locales[locale].entities[id]!.slug}`),
    ...catalog.models.map(({ id }) => `/${locale}/models/${catalog.locales[locale].entities[id]!.slug}`),
  ]).sort();

  return {
    catalog,
    entityById: new Map(entities.map((entry) => [entry.id, entry])),
    claimById: new Map(catalog.claims.map((entry) => [entry.id, entry])),
    evidenceById: new Map(catalog.evidence.map((entry) => [entry.id, entry])),
    relationsBySource: groupBy(catalog.relations, (entry) => entry.sourceId),
    relationsByTarget: groupBy(catalog.relations, (entry) => entry.targetId),
    claimsByEntity: groupBy(catalog.claims, (entry) => entry.subjectId),
    localeCounterpartSlugs,
    comparisonRows: Object.freeze(["family", "organization", "releaseDate", "availability", "capabilities"]),
    routeManifest: Object.freeze(routes),
  };
}
