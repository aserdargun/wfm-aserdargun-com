import { ArrowLeft, ExternalLink } from "lucide-react";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { EvidenceToken } from "../components/evidence/EvidenceToken";
import { formatAvailability, formatDate, formatModelFamily } from "../app/format";

export function ModelPage({ locale, entityId }: { locale: Locale; entityId: string }) {
  const model = catalog.models.find(({ id }) => id === entityId)!;
  const item = catalog.locales[locale].entities[entityId]!;
  const claim = catalog.claims.find(({ subjectId }) => subjectId === entityId)!;
  const evidence = catalog.evidence.find(({ id }) => claim.evidenceIds.includes(id))!;
  const source = catalog.sources.find(({ id }) => id === evidence.sourceId)!;
  return <article className="page detail-page"><a className="back-link" href={`/${locale}/models`}><ArrowLeft aria-hidden="true" />{locale === "tr" ? "Modellere dön" : "Back to models"}</a><header className="page-header"><span className="eyebrow">{model.organization.toLocaleUpperCase(locale === "tr" ? "tr-TR" : "en-US")} / {formatDate(model.releaseDate, locale)}</span><h1>{item.title}</h1><p>{item.summary}</p><div className="token-pair"><EvidenceToken locale={locale} kind="evidence" value={claim.evidenceStatus} /><EvidenceToken locale={locale} kind="verification" value={claim.verificationState} /></div></header>
    <section><h2>{locale === "tr" ? "Yaklaşım" : "Approach"}</h2><dl className="profile-grid"><div><dt>{locale === "tr" ? "Aile" : "Family"}</dt><dd>{formatModelFamily(locale, model.family)}</dd></div><div><dt>{locale === "tr" ? "Ağırlıklar" : "Weights"}</dt><dd>{formatAvailability(locale, model.availability.weights)}</dd></div><div><dt>{locale === "tr" ? "Kod" : "Code"}</dt><dd>{formatAvailability(locale, model.availability.code)}</dd></div><div><dt>{locale === "tr" ? "Makale / rapor" : "Paper / report"}</dt><dd>{formatAvailability(locale, model.availability.paper)}</dd></div><div><dt>API</dt><dd>{formatAvailability(locale, model.availability.api)}</dd></div><div><dt>{locale === "tr" ? "Ürün" : "Product"}</dt><dd>{formatAvailability(locale, model.availability.product)}</dd></div></dl></section>
    <section><h2>{locale === "tr" ? "Kanıta dayalı iddia" : "Evidence-backed claim"}</h2><p>{catalog.locales[locale].claims[claim.id]!.text}</p><p>{locale === "tr" ? "Son kaynak kontrolü" : "Source last checked"}: <time dateTime={source.lastChecked}>{formatDate(source.lastChecked, locale)}</time></p>{source.accessNotes ? <p className="source-review-note">{source.accessNotes[locale]}</p> : null}<a className="text-link" href={source.url} target="_blank" rel="noreferrer">{locale === "tr" ? "Birincil kaynağı aç" : "Open primary source"}<ExternalLink aria-hidden="true" /></a></section>
  </article>;
}
