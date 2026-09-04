import { ArrowUpRight } from "lucide-react";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { formatConceptFamily } from "../app/format";

export function ConceptIndexPage({ locale }: { locale: Locale }) {
  const primary = catalog.concepts.filter(({ featured }) => featured);
  const supporting = catalog.concepts.filter(({ featured }) => !featured);
  return <div className="page"><header className="page-header"><span className="eyebrow">{locale === "tr" ? "TEMEL SÖZLÜK" : "FIELD GLOSSARY"}</span><h1>{locale === "tr" ? "Kavramlar" : "Concepts"}</h1><p>{locale === "tr" ? "Dünya modellerini dil, görsel algı, planlama ve bedenlenmiş eylemle ilişkilendiren temel katmanlar ve mekanizmalar." : "The layers and mechanisms connecting world models with language, visual perception, planning, and embodied action."}</p></header>
    <ConceptGroup title={locale === "tr" ? "Okuma yolu" : "Reading path"} concepts={primary} locale={locale} />
    <ConceptGroup title={locale === "tr" ? "Destekleyici mekanizmalar" : "Supporting mechanisms"} concepts={supporting} locale={locale} />
  </div>;
}

function ConceptGroup({ title, concepts, locale }: { title: string; concepts: typeof catalog.concepts; locale: Locale }) {
  return <section className="entity-section"><h2>{title}</h2><div className="entity-list">{concepts.map(({ id, family }) => { const item = catalog.locales[locale].entities[id]!; return <a href={`/${locale}/concepts/${item.slug}`} key={id}><span className="entity-family">{formatConceptFamily(locale, family)}</span><h3>{item.title}</h3><p>{item.summary}</p><ArrowUpRight aria-hidden="true" /></a>; })}</div></section>;
}
