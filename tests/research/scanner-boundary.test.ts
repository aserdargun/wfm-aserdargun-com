import { mkdir, mkdtemp, readFile, readdir, rm, symlink, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
// @ts-expect-error Public JavaScript scanner contract.
import { scanSources } from "../../scripts/research/scan.mjs";
// @ts-expect-error Public JavaScript candidate contract.
import { createCandidate, writeCandidate } from "../../scripts/research/lib/candidate.mjs";
// @ts-expect-error Public JavaScript fetch contract.
import { fetchSource } from "../../scripts/research/lib/fetch-source.mjs";
import { sources } from "../../src/data/catalog/sources";

const cleanup: string[] = [];
async function scratch(inbox = false) {
  const base = inbox ? join(process.cwd(), "research/inbox") : tmpdir();
  await mkdir(base, { recursive: true });
  const path = await mkdtemp(join(base, "wfm-boundary-"));
  cleanup.push(path);
  return path;
}
afterEach(async () => { await Promise.all(cleanup.splice(0).map((path) => rm(path, { recursive: true, force: true }))); });

const source = { id: "source-example", url: "https://example.test/source", entityIds: ["world-model"] };
const candidate = () => createCandidate({ source, detectedAt: "2026-09-10T00:00:00.000Z", previousFingerprint: "old", nextFingerprint: "new" });

describe("research write boundary", () => {
  it("covers every catalog source and its subjects with deterministic offline scans", async () => {
    const registry = JSON.parse(await readFile("research/sources.json", "utf8"));
    expect(registry).toHaveLength(sources.length);
    for (const source of sources) {
      expect(registry).toContainEqual(expect.objectContaining({ id: source.id.replace(/^source-/, ""), url: source.url, entityIds: source.expectedEntityIds }));
    }
    const report = await scanSources({ inboxDir: await scratch(true), fixturesDir: "tests/fixtures/research" });
    expect(report.status).toBe("ready");
    expect(report.scanned).toBe(sources.length);
    expect(report.candidates).toEqual([]);
    expect(report.unchanged).toHaveLength(sources.length);
  });

  it("refuses insecure redirect targets without fetching them", async () => {
    const fetched: string[] = [];
    const result = await fetchSource(source, { fetchImpl: async (url: string) => {
      fetched.push(url);
      return new Response(null, { status: 302, headers: { location: "http://example.test/insecure" } });
    } });
    expect(result).toMatchObject({ ok: false, failure: { code: "FETCH_ERROR" } });
    expect(fetched).toEqual([source.url]);
  });
  it("rejects writes outside the inbox before creating files", async () => {
    const outside = await scratch();
    await expect(writeCandidate(candidate(), outside)).rejects.toThrow("research/inbox");
    expect(await readdir(outside)).toEqual([]);
  });

  it("rejects symlink escapes and candidate path traversal", async () => {
    const inbox = await scratch(true);
    const outside = await scratch();
    await symlink(outside, join(inbox, "escape"));
    await expect(writeCandidate(candidate(), join(inbox, "escape"))).rejects.toThrow("symbolic links");
    await expect(writeCandidate({ ...candidate(), id: "../../catalog" }, inbox)).rejects.toThrow("candidate ID");
    expect(await readdir(outside)).toEqual([]);
  });

  it("publishes once under concurrency and never replaces an existing review", async () => {
    const inbox = await scratch(true);
    const record = candidate();
    const writes = await Promise.all(Array.from({ length: 12 }, () => writeCandidate(record, inbox)));
    expect(writes.filter(Boolean)).toHaveLength(1);
    const filename = join(inbox, `${record.id}.json`);
    await writeFile(filename, JSON.stringify({ ...record, reviewState: "reviewed" }));
    expect(await writeCandidate(record, inbox)).toBe(false);
    expect(JSON.parse(await readFile(filename, "utf8")).reviewState).toBe("reviewed");
    expect(await readdir(inbox)).toEqual([`${record.id}.json`]);
  });

  it("creates a pending baseline candidate when a fingerprint is missing", async () => {
    const temp = await scratch();
    const registryPath = join(temp, "sources.json");
    await writeFile(registryPath, JSON.stringify([source]));
    const report = await scanSources({ registryPath, inboxDir: await scratch(true), fetchImpl: () => Promise.resolve(new Response("first observation", { headers: { "content-type": "text/plain" } })) });
    expect(report.candidates).toHaveLength(1);
    expect(report.candidates[0]).toMatchObject({ schemaVersion: 2, previousFingerprint: null, reviewState: "pending" });
    expect(report.unchanged).toEqual([]);
  });

  it("rejects malformed registries before fetching or writing", async () => {
    const temp = await scratch();
    const registryPath = join(temp, "sources.json");
    const inboxDir = await scratch(true);
    for (const invalid of [[], [source, source], [{ ...source, url: "file:///tmp/source" }], [{ ...source, fixture: "../escape.html" }]]) {
      await writeFile(registryPath, JSON.stringify(invalid));
      await expect(scanSources({ registryPath, inboxDir })).rejects.toThrow();
      expect(await readdir(inboxDir)).toEqual([]);
    }
  });
});
