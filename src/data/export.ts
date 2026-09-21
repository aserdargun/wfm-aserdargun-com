import { catalog } from "./catalog";
import { assertValidCatalog } from "./validate";

// No experiments or simulations run in this atlas; WML owns their versions.
export const versions = { catalog: 3, behavior: 3, export: 2 } as const;

export function getApprovedExport() {
  assertValidCatalog(catalog);
  return {
    versions,
    verificationDatePrecision: "day",
    unknownDateRepresentation: null,
    signals: catalog.signals.map((signal) => ({
      ...signal,
      locales: { en: catalog.locales.en.entities[signal.id], tr: catalog.locales.tr.entities[signal.id] },
      evidence: signal.evidenceIds.map((id) => {
        const evidence = catalog.evidence.find((entry) => entry.id === id)!;
        const source = catalog.sources.find((entry) => entry.id === evidence.sourceId)!;
        return {
          ...evidence,
          primarySourceUrl: source.url,
          sourcePublicationDate: source.publicationDate,
          sourceReviewNotes: source.accessNotes ?? null,
          verifiedOn: source.lastChecked,
          // A date-normalized timestamp, not a fabricated time of source review.
          freshnessTimestamp: `${source.lastChecked}T00:00:00.000Z`,
        };
      }),
    })),
  };
}
