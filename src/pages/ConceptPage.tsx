import { ArrowLeft } from "lucide-react";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { formatRelation } from "../app/format";

export function ConceptPage({ locale, entityId }: { locale: Locale; entityId: string }) {
  const item = catalog.locales[locale].entities[entityId]!;
  const relations = catalog.relations.filter(({ sourceId, targetId }) => sourceId === entityId || targetId === entityId);
  const relatedModels = catalog.claims.filter(({ field }) => entityId === "world-model" || field.includes(entityId)).map(({ subjectId }) => subjectId).filter((id) => catalog.models.some((model) => model.id === id));
  return <article className="page detail-page"><a className="back-link" href={`/${locale}/concepts`}><ArrowLeft aria-hidden="true" />{locale === "tr" ? "Kavramlara dön" : "Back to concepts"}</a><header className="page-header"><span className="eyebrow">{locale === "tr" ? "KAVRAM" : "CONCEPT"} / {item.title.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")}</span><h1>{item.title}</h1><p>{item.description ?? item.summary}</p></header>
    <section><h2>{locale === "tr" ? "Neden önemli?" : "Why it matters"}</h2><p>{item.significance ?? item.summary}</p></section>
    <section><h2>{locale === "tr" ? "İlişkiler" : "Relationships"}</h2><ul className="relation-list">{relations.map((relation) => <li key={relation.id}><code>{formatRelation(locale, relation.kind)}</code><span>{catalog.locales[locale].entities[relation.sourceId]?.title} → {catalog.locales[locale].entities[relation.targetId]?.title}</span></li>)}</ul></section>
    {relatedModels.length ? <section><h2>{locale === "tr" ? "İlgili modeller" : "Related models"}</h2><p>{relatedModels.map((id) => catalog.locales[locale].entities[id]!.title).join(", ")}</p></section> : null}
  </article>;
}
