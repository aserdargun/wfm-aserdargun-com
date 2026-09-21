import { describe, expect, it } from "vitest";
import { catalog } from "../../src/data/catalog";
import { getApprovedExport } from "../../src/data/export";
import { validateCatalog } from "../../src/data/validate";
import { makeValidCatalog } from "../helpers/catalog-fixture";

// Unknown dates are materially different from missing verification evidence.
describe("reviewed content and unknown dates", () => {
  it("accepts unknown event dates but still requires a real verification date", () => {
    const fixture = makeValidCatalog();
    fixture.sources[0]!.publicationDate = null;
    fixture.models[0]!.releaseDate = null;
    fixture.signals[0]!.eventDate = null;
    fixture.signals[0]!.publicationDate = null;
    expect(validateCatalog(fixture)).toEqual([]);
    fixture.sources[0]!.lastChecked = "";
    expect(validateCatalog(fixture).length).toBeGreaterThan(0);
  });

  it("preserves unknown Oasis 3 dates and the review explanation in the public export", () => {
    const signal = getApprovedExport().signals.find(({ id }) => id === "signal-oasis-3-release")!;
    expect(signal.eventDate).toBeNull();
    expect(signal.publicationDate).toBeNull();
    expect(signal.evidence[0]!.sourcePublicationDate).toBeNull();
    expect(signal.evidence[0]!.verificationState).toBe("needs-review");
    expect(signal.evidence[0]!.sourceReviewNotes?.en).toContain("date");
    expect(signal.evidence[0]!.sourceReviewNotes?.tr).toContain("tarih");
    expect(signal.evidence[0]!.verifiedOn).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("requires both translations for source review notes", () => {
    const fixture = makeValidCatalog();
    fixture.sources[0]!.accessNotes = { en: "Date unknown", tr: "" };
    expect(validateCatalog(fixture).some(({ code }) => code === "SCHEMA_INVALID")).toBe(true);
  });

  it("distinguishes video generation from latent feature prediction", () => {
    for (const id of ["genie-3", "atlas", "oasis"]) {
      expect(catalog.models.find((model) => model.id === id)!.capabilities.videoOutput).toBe(true);
    }
    expect(catalog.models.find((model) => model.id === "v-jepa-1")!.capabilities.videoOutput).toBe(false);
  });
});
