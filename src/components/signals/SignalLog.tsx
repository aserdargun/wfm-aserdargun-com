import { ExternalLink } from "lucide-react";
import { catalog } from "../../data/catalog";
import type { Locale } from "../../data/types";
import { EvidenceToken } from "../evidence/EvidenceToken";
import { formatDate } from "../../app/format";

export function SignalLog({ locale, compact = false }: { locale: Locale; compact?: boolean }) {
  const signals = [...catalog.signals].filter(({ approved }) => approved).sort((a, b) => b.eventDate.localeCompare(a.eventDate));
  return <div className={compact ? "signal-log signal-log--compact" : "signal-log"}>
    {signals.map((signal) => {
      const content = catalog.locales[locale].entities[signal.id]!;
      const evidence = catalog.evidence.find(({ id }) => signal.evidenceIds.includes(id))!;
      const source = catalog.sources.find(({ id }) => id === evidence.sourceId)!;
      return <article key={signal.id} data-testid="signal">
        <div className="signal-date"><time dateTime={signal.eventDate}>{formatDate(signal.eventDate, locale)}</time><span>{source.publisher}</span></div>
        <div className="signal-copy"><span className="eyebrow">{locale === "tr" ? "Ne değişti" : "What changed"}</span><h2>{content.title}</h2><p>{content.summary}</p>
          {!compact ? <p className="signal-meta">{locale === "tr" ? "Olay tarihi" : "Event date"}: {formatDate(signal.eventDate, locale)} · {locale === "tr" ? "Yayın tarihi" : "Published"}: {formatDate(signal.publicationDate, locale)} · {locale === "tr" ? "Son kaynak kontrolü" : "Source last checked"}: <time dateTime={source.lastChecked}>{formatDate(source.lastChecked, locale)}</time></p> : null}
        </div>
        <div className="signal-evidence"><EvidenceToken locale={locale} kind="evidence" value={evidence.evidenceStatus} />{!compact ? <EvidenceToken locale={locale} kind="verification" value={evidence.verificationState} /> : null}<a href={source.url} target="_blank" rel="noreferrer">{locale === "tr" ? "Kaynak" : "Source"}<ExternalLink aria-hidden="true" /></a></div>
      </article>;
    })}
  </div>;
}
