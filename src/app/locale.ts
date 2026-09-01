import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";

export function localeFromPath(path: string): Locale {
  const segment = path.split("/").filter(Boolean)[0];
  return segment === "tr" || segment === "en" ? segment : "en";
}

export function getLocaleCounterpart(pathWithSearch: string, targetLocale: Locale): string {
  const url = new URL(pathWithSearch, "https://atlas.local");
  const sourceLocale = localeFromPath(url.pathname);
  const segments = url.pathname.split("/").filter(Boolean);
  segments[0] = targetLocale;

  if ((segments[1] === "concepts" || segments[1] === "models") && segments[2]) {
    const entityId = Object.entries(catalog.locales[sourceLocale].entities)
      .find(([, content]) => content.slug === segments[2])?.[0];
    const targetSlug = entityId ? catalog.locales[targetLocale].entities[entityId]?.slug : undefined;
    if (targetSlug) segments[2] = targetSlug;
  }

  return `/${segments.join("/")}${url.search}${url.hash}`;
}
