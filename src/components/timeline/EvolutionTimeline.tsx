import { ExternalLink } from "lucide-react";
import { catalog } from "../../data/catalog";
import type { Locale } from "../../data/types";
import { EvidenceToken } from "../evidence/EvidenceToken";
import { formatDate } from "../../app/format";

export function EvolutionTimeline({ locale }: { locale: Locale }) {
  return <ol className="timeline">
    {[...catalog.milestones].sort((a, b) => (a.date ?? "9999").localeCompare(b.date ?? "9999")).map((milestone) => {
      const content = catalog.locales[locale].entities[milestone.id]!;
      const evidence = catalog.evidence.find(({ id }) => milestone.evidenceIds.includes(id));
      const source = catalog.sources.find(({ id }) => id === evidence?.sourceId);
      return <li key={milestone.id}>
        <time dateTime={milestone.date ?? undefined} data-testid="milestone-date">{formatDate(milestone.date, locale)}</time>
        <div><h2>{content.title}</h2><p>{content.summary}</p>{evidence ? <div className="token-pair"><EvidenceToken locale={locale} kind="evidence" value={evidence.evidenceStatus} /><EvidenceToken locale={locale} kind="verification" value={evidence.verificationState} /></div> : null}{source ? <a href={source.url} target="_blank" rel="noreferrer">{locale === "tr" ? "Birincil kaynak" : "Primary source"}<ExternalLink aria-hidden="true" /></a> : null}</div>
      </li>;
    })}
  </ol>;
}
