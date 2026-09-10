const allowedContentTypes = ["text/html", "application/xhtml+xml", "application/xml", "text/xml", "application/json", "text/plain"];

export async function fetchSource(source, options = {}) {
  const fetchImpl = options.fetchImpl ?? globalThis.fetch;
  const timeoutMs = options.timeoutMs ?? 15_000;
  const maxBytes = options.maxBytes ?? 2 * 1024 * 1024;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetchWithRedirects(source.url, fetchImpl, controller.signal, options.redirectLimit ?? 5);
    if (!response.ok) return failed(source, "HTTP_ERROR", `HTTP ${response.status}`);
    const contentType = (response.headers.get("content-type") ?? "").split(";")[0].trim().toLowerCase();
    if (!allowedContentTypes.includes(contentType)) return failed(source, "UNSUPPORTED_CONTENT_TYPE", contentType || "missing content type");
    const body = await readBounded(response, maxBytes);
    if (!body.ok) return failed(source, "RESPONSE_TOO_LARGE", `Response exceeded ${maxBytes} bytes.`);
    return { ok: true, sourceId: source.id, sourceUrl: source.url, content: new TextDecoder().decode(body.bytes), contentType };
  } catch (error) {
    if (error?.name === "AbortError" || controller.signal.aborted) return failed(source, "FETCH_TIMEOUT", `Source exceeded ${timeoutMs}ms.`);
    return failed(source, "FETCH_ERROR", error instanceof Error ? error.message : String(error));
  } finally {
    clearTimeout(timer);
  }
}

async function fetchWithRedirects(url, fetchImpl, signal, redirectLimit) {
  let current = url;
  for (let redirects = 0; redirects <= redirectLimit; redirects += 1) {
    if (new URL(current).protocol !== "https:") throw new Error("Research fetches and redirects must use HTTPS.");
    const response = await fetchImpl(current, {
      signal,
      redirect: "manual",
      headers: { "user-agent": "WorldModelsAtlasResearchScanner/0.1 (+https://wfm.aserdargun.com/method)" },
    });
    if (response.status < 300 || response.status >= 400) return response;
    const next = response.headers.get("location");
    if (!next) return response;
    await response.body?.cancel();
    if (redirects === redirectLimit) throw new Error("Redirect limit exceeded.");
    current = new URL(next, current).href;
  }
  throw new Error("Redirect limit exceeded.");
}

async function readBounded(response, maxBytes) {
  const declared = Number(response.headers.get("content-length"));
  if (Number.isFinite(declared) && declared > maxBytes) { await response.body?.cancel(); return { ok: false }; }
  if (!response.body) return { ok: true, bytes: new Uint8Array() };
  const reader = response.body.getReader();
  const chunks = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > maxBytes) { await reader.cancel(); return { ok: false }; }
    chunks.push(value);
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  return { ok: true, bytes };
}

function failed(source, code, message) {
  return { ok: false, failure: { sourceId: source.id, sourceUrl: source.url, code, message } };
}
