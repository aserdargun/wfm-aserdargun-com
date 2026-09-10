import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const checkout = process.cwd();
const distDir = resolve(checkout, "dist");
const ssrDir = resolve(checkout, "dist-ssr");
const template = await readFile(resolve(distDir, "index.html"), "utf8");
const server = await import(pathToFileURL(resolve(ssrDir, "entry-server.js")).href);
const manifest = server.getRouteManifest();

const localeLists = {
  en: manifest.filter(({ locale }) => locale === "en"),
  tr: manifest.filter(({ locale }) => locale === "tr"),
};

for (const route of manifest) {
  const rendered = server.renderRoute(route.path);
  const ownList = localeLists[route.locale];
  const counterpartLocale = route.locale === "en" ? "tr" : "en";
  const counterpart = localeLists[counterpartLocale][ownList.findIndex(({ path }) => path === route.path)];
  const canonical = `https://wfm.aserdargun.com${route.path}`;
  const metadata = [
    `<meta name="description" content="${escapeAttribute(route.description)}" />`,
    `<link rel="canonical" href="${canonical}" />`,
    `<link rel="alternate" hreflang="${route.locale}" href="${canonical}" />`,
    counterpart ? `<link rel="alternate" hreflang="${counterpartLocale}" href="https://wfm.aserdargun.com${counterpart.path}" />` : "",
  ].join("\n    ");
  const html = template
    .replace('<html lang="en">', `<html lang="${route.locale}">`)
    .replace(/<title>.*?<\/title>/, `<title>${escapeHtml(route.title)}</title>\n    ${metadata}`)
    .replace('<div id="root"></div>', `<div id="root">${rendered.appHtml}</div>`);
  const outputDir = resolve(distDir, route.path.replace(/^\//, ""));
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, "index.html"), html, "utf8");
}

await writeFile(resolve(distDir, "research-export.json"), `${JSON.stringify(server.getApprovedExport(), null, 2)}\n`);
await writeFile(resolve(distDir, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${manifest.map(({ path }) => `<url><loc>https://wfm.aserdargun.com${path}</loc></url>`).join("")}</urlset>\n`);
await writeFile(resolve(distDir, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://wfm.aserdargun.com/sitemap.xml\n");

await rm(ssrDir, { recursive: true, force: true });

function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll('"', "&quot;");
}
