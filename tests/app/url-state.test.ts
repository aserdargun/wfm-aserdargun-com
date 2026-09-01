import { describe, expect, it } from "vitest";
import { parseAtlasUrl, serializeAtlasUrl } from "../../src/app/url-state";

describe("atlas URL state", () => {
  it("deduplicates model comparisons in catalog order", () => {
    expect(parseAtlasUrl(new URL("https://atlas.test/en/models?compare=atlas,v-jepa-2,atlas")))
      .toMatchObject({ locale: "en", compare: ["v-jepa-2", "atlas"] });
  });

  it("drops unknown filters and serializes keys consistently", () => {
    const state = parseAtlasUrl(new URL("https://atlas.test/tr/models?capability=videoOutput&family=video-world&stage=world-model&compare=genie-3,missing"));
    expect(serializeAtlasUrl(state)).toBe("/tr/models?stage=world-model&family=video-world&capability=videoOutput&compare=genie-3");
  });
});
