import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import process from "node:process";
import { pathToFileURL } from "node:url";
import { createCandidate, writeCandidate } from "./lib/candidate.mjs";
import { fetchSource } from "./lib/fetch-source.mjs";
import { fingerprintContent } from "./lib/fingerprint.mjs";

export async function scanSources(options = {}) {
  const registryPath = resolve(options.registryPath ?? "research/sources.json");
  const inboxDir = resolve(options.inboxDir ?? "research/inbox");
  const fixturesDir = options.fixturesDir ? resolve(options.fixturesDir) : undefined;
  const detectedAt = options.detectedAt ?? new Date().toISOString();
  const sources = JSON.parse(await readFile(registryPath, "utf8"));
  const candidates = [];
  const failures = [];
  const unchanged = [];

  for (const source of sources) {
    let fetched;
    if (fixturesDir) {
      try {
        const fixtureName = source.fixture ?? `${source.id}.html`;
        fetched = { ok: true, sourceId: source.id, sourceUrl: source.url, content: await readFile(resolve(fixturesDir, fixtureName), "utf8") };
      } catch (error) {
        failures.push({ sourceId: source.id, sourceUrl: source.url, code: "FIXTURE_READ_ERROR", message: error instanceof Error ? error.message : String(error) });
        continue;
      }
    } else {
      fetched = await fetchSource(source, options);
    }
    if (!fetched.ok) { failures.push(fetched.failure); continue; }
    const nextFingerprint = fingerprintContent(fetched.content);
    const previousFingerprint = source.previousFingerprint ?? nextFingerprint;
    if (previousFingerprint === nextFingerprint) { unchanged.push(source.id); continue; }
    const candidate = createCandidate({ source, detectedAt, previousFingerprint, nextFingerprint });
    if (await writeCandidate(candidate, inboxDir)) candidates.push(candidate);
  }

  return {
    status: failures.length === sources.length ? "blocked" : failures.length ? "partial" : "ready",
    detectedAt,
    scanned: sources.length,
    unchanged,
    candidates,
    failures,
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const fixtureIndex = process.argv.indexOf("--fixtures");
  const fixturesDir = fixtureIndex >= 0 ? process.argv[fixtureIndex + 1] : undefined;
  const report = await scanSources({ fixturesDir });
  console.log(JSON.stringify(report, null, 2));
  if (report.status === "blocked") process.exitCode = 1;
}
