import { lstat, realpath } from "node:fs/promises";
import { dirname, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const checkout = resolve(dirname(fileURLToPath(import.meta.url)), "../../..");
export const researchInbox = resolve(checkout, "research/inbox");

export async function assertInboxPath(directory = researchInbox) {
  const destination = resolve(directory);
  const withinInbox = relative(researchInbox, destination);
  if (withinInbox === ".." || withinInbox.startsWith(`..${sep}`) || resolve(researchInbox, withinInbox) !== destination) {
    throw new Error("Research writes must stay beneath this checkout's research/inbox/.");
  }
  // Check existing ancestors before creating anything, including the inbox itself.
  let current = await realpath(checkout);
  for (const segment of relative(checkout, destination).split(sep)) {
    current = resolve(current, segment);
    try {
      if ((await lstat(current)).isSymbolicLink()) throw new Error("Research inbox paths must not contain symbolic links.");
    } catch (error) {
      if (error.code !== "ENOENT") throw error;
    }
  }
  return destination;
}
