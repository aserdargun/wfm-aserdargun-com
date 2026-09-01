import { describe, expect, it } from "vitest";
import { validateCatalog } from "../../src/data/validate";
import { makeValidCatalog } from "../helpers/catalog-fixture";

describe("catalog contract", () => {
  it("accepts a valid bilingual fixture", () => {
    const catalog = makeValidCatalog();
    expect(validateCatalog(catalog)).toEqual([]);
    expect(Object.keys(catalog.locales)).toEqual(["en", "tr"]);
  });
});
