import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";

export interface RouteRecord {
  path: string;
  locale: Locale;
  title: string;
  description: string;
}

export function getRouteManifest(): RouteRecord[] {
  return (["en", "tr"] as const).flatMap((locale) => {
    const isTr = locale === "tr";
    const base: RouteRecord[] = [
      { path: `/${locale}`, locale, title: isTr ? "World Models Atlas — Alan Haritası" : "World Models Atlas — Field Map", description: isTr ? "Dilden fiziksel zekâya kanıta dayalı alan haritası." : "An evidence-backed field map from language to physical intelligence." },
      { path: `/${locale}/concepts`, locale, title: isTr ? "Kavramlar — World Models Atlas" : "Concepts — World Models Atlas", description: isTr ? "Dünya modellerinin temel kavramları." : "Foundational concepts for world models." },
      { path: `/${locale}/models`, locale, title: isTr ? "Modeller — World Models Atlas" : "Models — World Models Atlas", description: isTr ? "Temsili dünya modeli ailelerini karşılaştırın." : "Compare representative world-model families." },
      { path: `/${locale}/evolution`, locale, title: isTr ? "Evrim — World Models Atlas" : "Evolution — World Models Atlas", description: isTr ? "Alanı şekillendiren dönüm noktaları." : "Milestones that shaped the field." },
      { path: `/${locale}/signals`, locale, title: isTr ? "Sinyaller — World Models Atlas" : "Signals — World Models Atlas", description: isTr ? "Onaylanmış güncel değişiklikler." : "Approved recent changes." },
      { path: `/${locale}/method`, locale, title: isTr ? "Yöntem — World Models Atlas" : "Method — World Models Atlas", description: isTr ? "Kaynak, kanıt ve güncellik politikası." : "Source, evidence, and freshness policy." },
    ];
    const conceptRoutes = catalog.concepts.map(({ id }) => ({
      path: `/${locale}/concepts/${catalog.locales[locale].entities[id]!.slug}`,
      locale,
      title: `${catalog.locales[locale].entities[id]!.title} — World Models Atlas`,
      description: catalog.locales[locale].entities[id]!.summary,
    }));
    const modelRoutes = catalog.models.map(({ id }) => ({
      path: `/${locale}/models/${catalog.locales[locale].entities[id]!.slug}`,
      locale,
      title: `${catalog.locales[locale].entities[id]!.title} — World Models Atlas`,
      description: catalog.locales[locale].entities[id]!.summary,
    }));
    return [...base, ...conceptRoutes, ...modelRoutes];
  });
}
