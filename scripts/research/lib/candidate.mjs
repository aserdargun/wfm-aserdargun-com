import { createHash, randomUUID } from "node:crypto";
import { link, mkdir, rm, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { assertInboxPath } from "./inbox-path.mjs";

export function createCandidate({ source, detectedAt, previousFingerprint, nextFingerprint }) {
  const id = createHash("sha256").update(JSON.stringify([source.id, previousFingerprint, nextFingerprint])).digest("hex");
  return {
    schemaVersion: 2,
    id,
    sourceId: source.id,
    entityIds: [...source.entityIds],
    detectedAt,
    previousFingerprint,
    nextFingerprint,
    changeSummary: previousFingerprint === null
      ? "First source observation without an approved baseline; human review is required."
      : "Official source content fingerprint changed; human review is required.",
    sourceUrl: source.url,
    reviewState: "pending",
  };
}

export async function writeCandidate(candidate, inboxDir) {
  if (!/^[a-f0-9]{64}$/.test(candidate.id)) throw new Error("Invalid candidate ID.");
  inboxDir = await assertInboxPath(inboxDir);
  await mkdir(inboxDir, { recursive: true });
  const destination = join(inboxDir, `${candidate.id}.json`);
  const temporary = join(inboxDir, `.${candidate.id}.${randomUUID()}.tmp`);
  await writeFile(temporary, `${JSON.stringify(candidate, null, 2)}\n`, { encoding: "utf8", flag: "wx" });
  // A hard link publishes a complete file atomically and never replaces a review.
  try { await link(temporary, destination); }
  catch (error) {
    if (error.code === "EEXIST") return false;
    throw error;
  } finally {
    await rm(temporary, { force: true });
  }
  return true;
}
