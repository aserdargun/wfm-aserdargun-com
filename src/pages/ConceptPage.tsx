import { ArrowLeft } from "lucide-react";
import { PortfolioContext } from "../components/PortfolioContext";
import { WorldModelLab } from "../components/WorldModelLab";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { formatRelation } from "../app/format";

export function ConceptPage({ locale, entityId }: { locale: Locale; entityId: string }) {
  const item = catalog.locales[locale].entities[entityId]!;
  const relations = catalog.relations.filter(({ sourceId, targetId }) => sourceId === entityId || targetId === entityId);
  // Use explicitly reviewed source coverage, not substring matches between field names.
  const sourceModelIds = new Set(catalog.sources.filter((source) => source.expectedEntityIds.includes(entityId)).flatMap((source) => source.expectedEntityIds));
  const relatedModels = catalog.models.filter((model) => entityId === "world-model" || sourceModelIds.has(model.id));
  const conceptLink = (id: string) => <a href={`/${locale}/concepts/${catalog.locales[locale].entities[id]!.slug}`}>{catalog.locales[locale].entities[id]!.title}</a>;
  return <article className="page detail-page"><a className="back-link" href={`/${locale}/concepts`}><ArrowLeft aria-hidden="true" />{locale === "tr" ? "Kavramlara dön" : "Back to concepts"}</a><header className="page-header"><span className="eyebrow">{locale === "tr" ? "KAVRAM" : "CONCEPT"} / {item.title.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")}</span><h1>{item.title}</h1><p>{item.description ?? item.summary}</p></header>
    <section><h2>{locale === "tr" ? "Neden önemli?" : "Why it matters"}</h2><p>{item.significance ?? item.summary}</p></section>
    <section><h2>{locale === "tr" ? "İlişkiler" : "Relationships"}</h2><ul className="relation-list">{relations.map((relation) => <li key={relation.id}><code>{formatRelation(locale, relation.kind)}</code><span>{conceptLink(relation.sourceId)} → {conceptLink(relation.targetId)}</span></li>)}</ul></section>
    {relatedModels.length ? <section><h2>{locale === "tr" ? "İlgili modeller" : "Related models"}</h2><ul className="related-models">{relatedModels.map(({ id }) => <li key={id}><a href={`/${locale}/models/${catalog.locales[locale].entities[id]!.slug}`}>{catalog.locales[locale].entities[id]!.title}</a></li>)}</ul></section> : null}
    {["world-model", "planner", "action-conditioning", "uncertainty", "interactive-control"].includes(entityId) && <WorldModelLab locale={locale} />}
    {["digital-twin", "physical-ai", "sim-to-real"].includes(entityId) && <PortfolioContext locale={locale} />}
  </article>;
}
