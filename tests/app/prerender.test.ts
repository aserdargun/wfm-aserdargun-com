import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("static route output", () => {
  it("prerenders locale and model detail routes", async () => {
    const trHome = await readFile("dist/tr/index.html", "utf8");
    const enHome = await readFile("dist/en/index.html", "utf8");
    const model = await readFile("dist/tr/models/atlas/index.html", "utf8");
    expect(trHome).toContain('<html lang="tr">');
    expect(trHome).toContain("Dilden fiziksel zekâya");
    expect(enHome).toContain('<html lang="en">');
    expect(model).toContain("Atlas");
  });
});
