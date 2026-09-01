import { createHash } from "node:crypto";
import { access, mkdir, rename, writeFile } from "node:fs/promises";
import { join } from "node:path";

export function createCandidate({ source, detectedAt, previousFingerprint, nextFingerprint }) {
  const id = createHash("sha256").update(`${source.id}${previousFingerprint}${nextFingerprint}`).digest("hex");
  return {
    id,
    sourceId: source.id,
    entityIds: [...source.entityIds],
    detectedAt,
    previousFingerprint,
    nextFingerprint,
    changeSummary: "Official source content fingerprint changed; human review is required.",
    sourceUrl: source.url,
    reviewState: "pending",
  };
}

export async function writeCandidate(candidate, inboxDir) {
  await mkdir(inboxDir, { recursive: true });
  const destination = join(inboxDir, `${candidate.id}.json`);
  try { await access(destination); return false; } catch { /* candidate is new */ }
  const temporary = join(inboxDir, `.${candidate.id}.${process.pid}.tmp`);
  await writeFile(temporary, `${JSON.stringify(candidate, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  try { await rename(temporary, destination); }
  catch (error) {
    try { await access(destination); return false; } catch { throw error; }
  }
  return true;
}
