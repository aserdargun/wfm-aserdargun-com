import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

describe("Azure Static Web Apps artifact contract", () => {
  it("redirects the root and ships security headers", async () => {
    const config = JSON.parse(await readFile("public/staticwebapp.config.json", "utf8"));
    expect(config.routes).toContainEqual({ route: "/", redirect: "/en", statusCode: 301 });
    expect(config.globalHeaders["Content-Security-Policy"]).toContain("frame-ancestors 'none'");
    expect(config.navigationFallback.exclude).toContain("/assets/*");
  });
});
