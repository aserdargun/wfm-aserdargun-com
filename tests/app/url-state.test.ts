import { describe, expect, it } from "vitest";
import { parseAtlasUrl, serializeAtlasUrl } from "../../src/app/url-state";

describe("atlas URL state", () => {
  it("deduplicates model comparisons in catalog order", () => {
    expect(parseAtlasUrl(new URL("https://atlas.test/en/models?compare=atlas,v-jepa-2,atlas")))
      .toMatchObject({ locale: "en", compare: ["v-jepa-2", "atlas"] });
  });

  it("drops unknown filters and serializes keys consistently", () => {
    const state = parseAtlasUrl(new URL("https://atlas.test/tr/models?capability=action-conditioning&family=video-world&stage=world-model&compare=genie-3,missing"));
    expect(serializeAtlasUrl(state)).toBe("/tr/models?stage=world-model&family=video-world&capability=action-conditioning&compare=genie-3");
  });
});

// Unknown and excessive URL state cannot bypass visible controls.
it("rejects unsupported stages and limits comparisons to four", () => {
  const state = parseAtlasUrl(new URL("https://atlas.test/en?stage=uncertainty&capability=bogus&compare=atlas,dreamer-v3,v-jepa-2,cosmos-3,genie-3"));
  expect(state.stage).toBeUndefined();
  expect(state.capability).toBeUndefined();
  expect(state.compare).toHaveLength(4);
});
