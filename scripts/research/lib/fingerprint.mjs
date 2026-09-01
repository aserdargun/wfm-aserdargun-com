import { createHash } from "node:crypto";

export function normalizeContent(content) {
  return content
    .replace(/\r\n?/g, "\n")
    .replace(/([?&])(utm_[a-z_]+|fbclid|gclid)=[^&"'\s<]+/gi, "$1")
    .replace(/[?&](?=["'\s<])/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function fingerprintContent(content) {
  return createHash("sha256").update(normalizeContent(content)).digest("hex");
}
