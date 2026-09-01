import { describe, expect, it } from "vitest";
import { getLocaleCounterpart, localeFromPath } from "../../src/app/locale";

describe("locale routing", () => {
  it("preserves route state when switching locale", () => {
    expect(getLocaleCounterpart("/tr/models/atlas?family=spatial-world", "en"))
      .toBe("/en/models/atlas?family=spatial-world");
  });

  it("maps localized concept slugs", () => {
    expect(getLocaleCounterpart("/tr/concepts/dunya-modeli", "en"))
      .toBe("/en/concepts/world-model");
  });

  it("falls back safely for invalid locales", () => {
    expect(localeFromPath("/de/models")).toBe("en");
  });
});
