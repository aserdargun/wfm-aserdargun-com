import { describe, expect, it } from "vitest";
import { en } from "../../src/data/locales/en";
import { tr } from "../../src/data/locales/tr";
import { models } from "../../src/data/catalog/models";

/**
 * A localized description must talk about the entity that carries it.
 *
 * These records were once shifted by one position, so every model page
 * described its neighbour: the V-JEPA 2 page opened with DreamerV3's text and
 * DreamerV3 had no description at all. Because the shift is silent — every
 * entry still holds a plausible sentence — only an explicit check catches it.
 */
const SUBJECT_TOKENS: Record<string, RegExp> = {
  "dreamer-v3": /dreamerv3|dreamer/i,
  "v-jepa-2": /v-?jepa\s*2/i,
  "genie-3": /genie\s*3/i,
  "cosmos-3": /cosmos\s*3/i,
  atlas: /atlas/i,
  "gwm-1": /gwm-?1/i,
  "waymo-world-model": /waymo/i,
  "gaia-3": /gaia-?3/i,
  "v-jepa-1": /v-?jepa(?!.*2)/i,
  "cosmos-1": /cosmos\s*1/i,
  "gaia-1": /gaia-?1/i,
  oasis: /oasis(?!.*3)/i,
  "oasis-3": /oasis\s*3/i,
};

const modelIds = models.map(({ id }) => id);

describe("localized model descriptions stay attached to their own model", () => {
  it.each(["en", "tr"] as const)("%s descriptions name their own model", (locale) => {
    const entities = locale === "en" ? en.entities : tr.entities;

    for (const id of modelIds) {
      const entity = entities[id];
      expect(entity, `${locale} is missing model ${id}`).toBeDefined();
      if (!entity) continue;

      const text = [entity.description, entity.significance].filter(Boolean).join(" ");
      expect(text.length, `${locale}/${id} has no description to check`).toBeGreaterThan(0);

      const token = SUBJECT_TOKENS[id];
      expect(
        token?.test(text),
        `${locale}/${id} describes a different model: ${text.slice(0, 90)}`,
      ).toBe(true);
    }
  });

  it("keeps EN and TR descriptions in step for every model", () => {
    for (const id of modelIds) {
      const hasEn = Boolean(en.entities[id]?.description);
      const hasTr = Boolean(tr.entities[id]?.description);
      expect(hasEn, `en/${id} lost its description`).toBe(hasTr);
    }
  });
});
