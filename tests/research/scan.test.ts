import { createHash } from "node:crypto";
import { mkdir, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterEach, describe, expect, it } from "vitest";
// @ts-expect-error JavaScript research module is exercised through its public runtime contract.
import { scanSources } from "../../scripts/research/scan.mjs";
// @ts-expect-error JavaScript research module is exercised through its public runtime contract.
import { fingerprintContent } from "../../scripts/research/lib/fingerprint.mjs";
// @ts-expect-error JavaScript research module is exercised through its public runtime contract.
import { fetchSource } from "../../scripts/research/lib/fetch-source.mjs";

const scratchPaths: string[] = [];
async function createInbox() {
  await mkdir("research/inbox", { recursive: true });
  const path = await mkdtemp(join(process.cwd(), "research/inbox/test-scan-"));
  scratchPaths.push(path);
  return path;
}
afterEach(async () => { await Promise.all(scratchPaths.splice(0).map((path) => rm(path, { recursive: true, force: true }))); });

async function hashDirectory(path: string) {
  const hash = createHash("sha256");
  for (const name of (await readdir(path)).sort()) hash.update(name).update(await readFile(join(path, name)));
  return hash.digest("hex");
}

describe("research scanner", () => {
  it("normalizes irrelevant whitespace before fingerprinting", () => {
    expect(fingerprintContent("A\r\n  B   C")).toBe(fingerprintContent("A B C"));
  });

  it("creates stable review candidates, suppresses duplicates, and leaves public data untouched", async () => {
    const scratch = await mkdtemp(join(tmpdir(), "wfm-scan-"));
    const registryPath = join(scratch, "sources.json");
    const inboxDir = await createInbox();
    await writeFile(registryPath, JSON.stringify([
      { id: "meta-vjepa2", url: "https://ai.meta.com/blog/v-jepa-2-world-model-benchmarks/", entityIds: ["v-jepa-2"], fixture: "meta-vjepa2.html", previousFingerprint: "previous-meta" },
      { id: "worldlabs-atlas", url: "https://www.worldlabs.ai/blog/atlas", entityIds: ["atlas"], fixture: "worldlabs-atlas.html", previousFingerprint: "previous-atlas" },
    ]));
    const publicHashBefore = await hashDirectory("src/data/catalog");
    const options = { registryPath, inboxDir, fixturesDir: "tests/fixtures/research", detectedAt: "2026-09-01T12:00:00.000Z" };
    const first = await scanSources(options);
    const second = await scanSources(options);
    expect(first.status).toBe("ready");
    expect(first.candidates).toHaveLength(2);
    expect(second.candidates).toHaveLength(0);
    expect((await readdir(inboxDir)).filter((name) => name.endsWith(".json"))).toHaveLength(2);
    expect(first.candidates[0]).toMatchObject({ reviewState: "pending", detectedAt: "2026-09-01T12:00:00.000Z" });
    expect(first.candidates[0]?.sourceUrl.startsWith("https://")).toBe(true);
    expect(await hashDirectory("src/data/catalog")).toBe(publicHashBefore);
  });

  it("reports timeouts without discarding successful sources", async () => {
    const scratch = await mkdtemp(join(tmpdir(), "wfm-timeout-"));
    const registryPath = join(scratch, "sources.json");
    await writeFile(registryPath, JSON.stringify([
      { id: "ok", url: "https://example.test/ok", entityIds: ["atlas"], previousFingerprint: "old" },
      { id: "slow", url: "https://example.test/slow", entityIds: ["atlas"], previousFingerprint: "old" },
    ]));
    const fetchImpl = (url: string, options: RequestInit) => url.endsWith("/ok")
      ? Promise.resolve(new Response("updated", { headers: { "content-type": "text/plain" } }))
      : new Promise<Response>((_, reject) => options.signal?.addEventListener("abort", () => reject(new DOMException("aborted", "AbortError"))));
    const report = await scanSources({ registryPath, inboxDir: await createInbox(), detectedAt: "2026-09-01T12:00:00.000Z", fetchImpl, timeoutMs: 5 });
    expect(report.status).toBe("partial");
    expect(report.failures[0]?.code).toBe("FETCH_TIMEOUT");
    expect(report.candidates).toHaveLength(1);
  });

  it("rejects responses larger than the configured bound", async () => {
    const response = new Response("x".repeat(128), { headers: { "content-type": "text/plain" } });
    const result = await fetchSource({ id: "large", url: "https://example.test/large" }, { fetchImpl: () => Promise.resolve(response), maxBytes: 64 });
    expect(result).toMatchObject({ ok: false, failure: { code: "RESPONSE_TOO_LARGE" } });
  });
});
