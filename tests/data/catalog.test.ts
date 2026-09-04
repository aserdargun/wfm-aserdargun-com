import { describe, expect, it } from "vitest";
import { catalog } from "../../src/data/catalog";
import { deriveCatalog } from "../../src/data/derived";
import { validateCatalog } from "../../src/data/validate";

describe("published catalog", () => {
  it("contains the approved initial model set in stable order", () => {
    expect(catalog.models.map(({ id }) => id)).toEqual([
      "dreamer-v3",
      "v-jepa-2",
      "genie-3",
      "cosmos-3",
      "atlas",
      "gwm-1",
      "waymo-world-model",
      "gaia-3",
      "v-jepa-1",
      "cosmos-1",
      "gaia-1",
      "oasis",
      "oasis-3",
    ]);
  });

  it("covers the opening sequence and supporting concepts", () => {
    expect(catalog.concepts.map(({ id }) => id)).toEqual(expect.arrayContaining([
      "llm", "vlm", "world-model", "planner", "agent", "physical-ai", "digital-twin",
      "latent-state", "action-conditioning", "uncertainty", "sim-to-real",
    ]));
  });

  it("uses canonical HTTPS primary sources and validates cleanly", () => {
    expect(catalog.sources.every(({ url }) => url.startsWith("https://"))).toBe(true);
    expect(validateCatalog(catalog)).toEqual([]);
    expect(deriveCatalog(catalog).routeManifest).toContain("/tr/models/atlas");
  });

  it("has paired public entity and claim content", () => {
    const publicIds = [
      ...catalog.concepts.map(({ id }) => id),
      ...catalog.models.map(({ id }) => id),
      ...catalog.milestones.map(({ id }) => id),
      ...catalog.signals.map(({ id }) => id),
    ];
    for (const id of publicIds) {
      for (const locale of ["en", "tr"] as const) {
        expect(catalog.locales[locale].entities[id]).toMatchObject({
          title: expect.any(String),
          summary: expect.any(String),
          slug: expect.any(String),
        });
      }
    }
    for (const { id } of catalog.claims) {
      expect(catalog.locales.en.claims[id]?.text).toBeTruthy();
      expect(catalog.locales.tr.claims[id]?.text).toBeTruthy();
    }
  });
});
