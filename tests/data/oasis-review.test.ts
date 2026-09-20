import { describe, expect, it } from "vitest";
import { catalog } from "../../src/data/catalog";
import { validateCatalog } from "../../src/data/validate";

/**
 * Regression test for the 2026-09-18 re-review of the Oasis 3 primary source.
 *
 * Scope: this test only restricts itself to Oasis 3-related records. It is a
 * material re-review, not a global catalog date bump. The original
 * observation was that the Oasis 3 evidence was marked `needs-review` while
 * the actual primary page on https://decart.ai/oasis is publicly accessible
 * and describes real-time, control-conditioned, multi-view, AV-first,
 * API-exposed simulation environments.
 *
 * The intended outcomes:
 *   1. The primary source is re-confirmed as accessible on 2026-09-18 and the
 *      accessNotes spell out what was actually reviewed (hero / How it works /
 *      FAQ text) and what was NOT reviewed (deep help-center answers, embedded
 *      videos, sim2real benchmarks, third-party evaluations).
 *   2. The claim text in EN and TR keeps the language of a vendor report
 *      ("Decart reports" / "Decart bildiriyor") and does NOT silently promote
 *      the evidence to `demonstrated` or `validated`. The "first / only"
 *      framing from Decart's marketing copy is not repeated as if independently
 *      verified. Independent measurement is explicitly recorded as unknown.
 *   3. The catalog still validates clean: every other record is left intact
 *      and the validation pipeline must keep accepting it.
 *   4. The Oasis 3 evidence record stays at `verificationState: "needs-review"`
 *      because the parent agent has not authorized a human-approved
 *      promotion to `current`. Auto-promotion is forbidden by methodology.
 */

const oasis3 = () => {
  const model = catalog.models.find(({ id }) => id === "oasis-3");
  if (!model) throw new Error("oasis-3 model missing from catalog");
  return model;
};

const oasis3Claim = () => {
  const claim = catalog.claims.find(({ subjectId, id }) => subjectId === "oasis-3" && id === "claim-oasis3-physical-ai");
  if (!claim) throw new Error("claim-oasis3-physical-ai missing from catalog");
  return claim;
};

const oasis3Evidence = () => {
  const entry = catalog.evidence.find(({ id }) => id === "evidence-decart-oasis3");
  if (!entry) throw new Error("evidence-decart-oasis3 missing from catalog");
  return entry;
};

const oasis3Source = () => {
  const entry = catalog.sources.find(({ id }) => id === "source-decart-oasis3");
  if (!entry) throw new Error("source-decart-oasis3 missing from catalog");
  return entry;
};

describe("Oasis 3 primary-source re-review (2026-09-18)", () => {
  it("records the 2026-09-18 primary-source check and an explicit scope", () => {
    const source = oasis3Source();
    expect(source.lastChecked).toBe("2026-09-18");
    expect(source.url).toBe("https://decart.ai/oasis");
    expect(source.publisher).toBe("Decart");
    expect(source.expectedEntityIds).toContain("oasis-3");
    expect(source.accessNotes).toBeTruthy();
    const note = source.accessNotes!.toLowerCase();
    // Scope what was actually read.
    expect(note).toMatch(/2026-09-18|18 sept|18 eyl/);
    expect(note).toMatch(/decart\.ai\/oasis/);
    expect(note).toMatch(/hero|how it works|faq/);
    // Explicitly mark what was NOT reviewed.
    expect(note).toMatch(/independent|bağımsız|independent measurement/);
    expect(note).toMatch(/sim2real|sim[\s-]*to[\s-]*real|fizik motoru|physics engine/);
    expect(note).toMatch(/not validated|validated|doğrulanmadı|ölçülmedi/);
  });

  it("keeps the evidence as a vendor-reported, needs-review record", () => {
    const evidence = oasis3Evidence();
    const claim = oasis3Claim();
    expect(evidence.evidenceStatus).toBe("reported");
    expect(evidence.verificationState).toBe("needs-review");
    expect(claim.evidenceStatus).toBe("reported");
    // Auto-promotion to `current` / `demonstrated` is forbidden without human approval.
    expect(claim.verificationState).not.toBe("current");
    // The Oasis 3 evidence must explicitly support the Oasis 3 claim.
    expect(evidence.supportedClaimIds).toContain(claim.id);
    expect(claim.evidenceIds).toContain(evidence.id);
  });

  it("frames the bilingual claim as a vendor report and flags marketing 'only/first' as unverified", () => {
    const en = catalog.locales.en.claims["claim-oasis3-physical-ai"]!.text.toLowerCase();
    const tr = catalog.locales.tr.claims["claim-oasis3-physical-ai"]!.text.toLowerCase();
    // Both languages must attribute the claim to the vendor, not to independent measurement.
    expect(en).toMatch(/decart reports/);
    expect(tr).toMatch(/decart[\s\S]*bildiriyor/);
    // Marketing "only / first" copy must not be repeated as if independently verified.
    expect(en).not.toMatch(/\bthe only\b/);
    expect(en).not.toMatch(/\bthe first\b/);
    expect(tr).not.toMatch(/\bilk\b/);
    expect(tr).not.toMatch(/\btek\b/);
    // The claim text must keep an explicit "not independently measured" caveat.
    expect(en).toMatch(/not independently (measured|verified)/);
    expect(tr).toMatch(/bağımsız (ölçülmedi|doğrulanmadı)/);
  });

  it("documents the exact capability scope and keeps it vendor-reported, not physics-engine / sim2real", () => {
    const model = oasis3();
    expect(model.releaseDate).toBe("2026-06-10");
    expect(model.availability.api).toBe("api");
    // Capabilities should reflect what was actually described in the primary page.
    expect(model.capabilities.realTimeInference).toBe(true);
    expect(model.capabilities.actionConditioning).toBe(true);
    expect(model.capabilities.multiView).toBe(true);
    expect(model.capabilities.drivingSimulation).toBe(true);
    expect(model.capabilities.interactiveWorld).toBe(true);
    // No capability should silently claim physics-engine fidelity or sim2real validation.
    const capabilities = Object.keys(model.capabilities).map((key) => key.toLowerCase());
    expect(capabilities.some((key) => key.includes("physicsengine"))).toBe(false);
    expect(capabilities.some((key) => key.includes("sim2real") || key.includes("sim-to-real"))).toBe(false);
  });

  it("keeps the rest of the catalog untouched and the validator clean", () => {
    expect(validateCatalog(catalog)).toEqual([]);
    // The other 12 models must remain in stable order so this re-review does
    // not appear as a global catalogue churn.
    const ids = catalog.models.map(({ id }) => id);
    expect(ids.indexOf("oasis-3")).toBeGreaterThanOrEqual(0);
    expect(ids[ids.length - 1]).toBe("oasis-3");
    // Milestone and signal records referencing oasis-3 must still exist.
    expect(catalog.milestones.some(({ id, entityIds }) => id === "milestone-oasis-3" && entityIds.includes("oasis-3"))).toBe(true);
    expect(catalog.signals.some(({ id, affectedEntityIds }) => id === "signal-oasis-3-release" && affectedEntityIds.includes("oasis-3"))).toBe(true);
  });
});