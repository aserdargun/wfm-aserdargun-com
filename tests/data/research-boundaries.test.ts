import { describe, expect, it } from "vitest";
import { makeValidCatalog } from "../helpers/catalog-fixture";
import { validateCatalog } from "../../src/data/validate";
import { matchesCapability } from "../../src/data/capabilities";
import { getApprovedExport } from "../../src/data/export";

describe("research boundaries", () => {
  it("does not mistake an unknown capability for positive evidence", () => {
    const model = makeValidCatalog().models[0]!;
    model.capabilities = { multiView: "unknown", actionConditioning: "unknown" };
    expect(matchesCapability(model, "spatial-3d")).toBe(false);
    expect(matchesCapability(model, "action-conditioning")).toBe(false);
    model.capabilities.pointCloudOutput = true;
    expect(matchesCapability(model, "spatial-3d")).toBe(true);
  });

  it.each(["signals", "milestones"] as const)("rejects broken %s evidence before rendering", (collection) => {
    const catalog = makeValidCatalog();
    catalog[collection][0]!.evidenceIds = ["missing"];
    expect(validateCatalog(catalog).some(({ code }) => code === "CLAIM_EVIDENCE_REQUIRED")).toBe(true);
  });

  it("rejects disconnected evidence and whitespace-only translations", () => {
    const catalog = makeValidCatalog();
    catalog.evidence[0]!.supportedClaimIds = [];
    expect(validateCatalog(catalog).length).toBeGreaterThan(0);
    catalog.locales.tr.entities["signal-example"]!.summary = "   ";
    expect(validateCatalog(catalog).some(({ code }) => code === "SCHEMA_INVALID")).toBe(true);
  });

  it("exports paired copy, source, evidence strength, and date-normalized freshness for every signal", () => {
    const result = getApprovedExport();
    expect(result.versions.export).toBe(1);
    for (const signal of result.signals) {
      expect(signal.approved).toBe(true);
      expect(signal.locales.en?.summary).toBeTruthy();
      expect(signal.locales.tr?.summary).toBeTruthy();
      expect(signal.evidence.length).toBeGreaterThan(0);
      for (const evidence of signal.evidence) {
        expect(evidence.primarySourceUrl).toMatch(/^https:\/\//);
        expect(evidence.evidenceStatus).toBeTruthy();
        expect(evidence.freshnessTimestamp).toBe(`${evidence.verifiedOn}T00:00:00.000Z`);
      }
    }
  });
});
