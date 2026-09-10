import { ExternalLink } from "lucide-react";
import { catalog } from "../../data/catalog";
import type { Locale } from "../../data/types";
import { EvidenceToken } from "./EvidenceToken";
import { formatDate } from "../../app/format";

interface EvidenceInspectorProps {
  locale: Locale;
  entityId: string;
}

export function EvidenceInspector({ locale, entityId }: EvidenceInspectorProps) {
  const content = catalog.locales[locale].entities[entityId];
  const claim = catalog.claims.find((item) => item.subjectId === entityId);
  const evidence = claim ? catalog.evidence.find((item) => claim.evidenceIds.includes(item.id)) : undefined;
  const source = evidence ? catalog.sources.find((item) => item.id === evidence.sourceId) : undefined;
  const unknown = locale === "tr" ? "Bilinmiyor" : "Unknown";
  const title = content?.title ?? unknown;
  return <aside id="evidence-inspector" tabIndex={-1} className="evidence-inspector" aria-label={locale === "tr" ? "Kanıt inceleyici" : "Evidence inspector"}>
    <div className="inspector-kicker">{locale === "tr" ? "SEÇİLİ KATMAN" : "SELECTED LAYER"}</div>
    <h2>{title}</h2>
    <p className="inspector-summary">{content?.description ?? content?.summary ?? unknown}</p>
    <div className="token-pair">
      {claim ? <EvidenceToken locale={locale} kind="evidence" value={claim.evidenceStatus} /> : <span>{unknown}</span>}
      {claim ? <EvidenceToken locale={locale} kind="verification" value={claim.verificationState} /> : null}
    </div>
    <section className="inspector-section">
      <h3>{locale === "tr" ? "Temel iddia" : "Core claim"}</h3>
      <p>{claim ? catalog.locales[locale].claims[claim.id]?.text : unknown}</p>
    </section>
    <section className="inspector-section source-record">
      <h3>{locale === "tr" ? "Kaynak kaydı" : "Source record"}</h3>
      <dl>
        <div><dt>{locale === "tr" ? "Yayıncı" : "Publisher"}</dt><dd>{source?.publisher ?? unknown}</dd></div>
        <div><dt>{locale === "tr" ? "Son kontrol" : "Last checked"}</dt><dd>{source ? formatDate(source.lastChecked, locale) : unknown}</dd></div>
      </dl>
      {source ? <a className="source-link" href={source.url} target="_blank" rel="noreferrer" aria-label={`${title} ${locale === "tr" ? "birincil kaynağını aç" : "open primary source"}`}>
        {locale === "tr" ? "Birincil kaynağı aç" : "Open primary source"}<ExternalLink aria-hidden="true" />
      </a> : null}
    </section>
    <a className="method-inline" href={`/${locale}/method`}>{locale === "tr" ? "Kanıt etiketleri nasıl okunur?" : "How should these evidence labels be read?"}</a>
    <p className="sr-only" role="status" aria-live="polite">{title} {locale === "tr" ? "seçildi" : "selected"}</p>
  </aside>;
}
