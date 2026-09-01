import { describe, expect, it } from "vitest";
import type { Catalog } from "../../src/data/types";
import { validateCatalog } from "../../src/data/validate";
import { makeValidCatalog } from "../helpers/catalog-fixture";

const issueCodes = (catalog: Catalog) => validateCatalog(catalog).map(({ code }) => code);

describe("catalog validation fails closed", () => {
  it("requires evidence for public claims", () => {
    const catalog = makeValidCatalog();
    catalog.claims[0]!.evidenceIds = [];
    expect(issueCodes(catalog)).toContain("CLAIM_EVIDENCE_REQUIRED");
  });

  it("requires paired localized content", () => {
    const catalog = makeValidCatalog();
    delete catalog.locales.tr.entities[catalog.concepts[0]!.id];
    expect(issueCodes(catalog)).toContain("LOCALE_PARITY");
  });

  it("rejects duplicate entity ids", () => {
    const catalog = makeValidCatalog();
    catalog.models.push(structuredClone(catalog.models[0]!));
    expect(issueCodes(catalog)).toContain("DUPLICATE_ID");
  });

  it("rejects orphaned relations", () => {
    const catalog = makeValidCatalog();
    catalog.relations[0]!.targetId = "missing-entity";
    expect(issueCodes(catalog)).toContain("ORPHAN_RELATION");
  });

  it("requires rationale for inferred claims", () => {
    const catalog = makeValidCatalog();
    catalog.claims[0]!.evidenceStatus = "inferred";
    delete catalog.claims[0]!.rationale;
    expect(issueCodes(catalog)).toContain("RATIONALE_REQUIRED");
  });

  it("keeps unapproved signals out of the public catalog", () => {
    const catalog = makeValidCatalog();
    catalog.signals[0]!.approved = false;
    expect(issueCodes(catalog)).toContain("SIGNAL_NOT_APPROVED");
  });

  it("rejects impossible calendar dates", () => {
    const catalog = makeValidCatalog();
    catalog.sources[0]!.publicationDate = "2026-02-31";
    expect(issueCodes(catalog)).toContain("INVALID_DATE");
  });

  it("rejects unknown values disguised as numeric scores", () => {
    const catalog = makeValidCatalog();
    catalog.models[0]!.capabilities.overallScore = 0;
    expect(issueCodes(catalog)).toContain("FALSE_COMPARABILITY");
  });
});
