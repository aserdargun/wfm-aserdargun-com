import { ExternalLink } from "lucide-react";
import { catalog } from "../../data/catalog";
import type { Locale } from "../../data/types";
import { formatDate } from "../../app/format";

export function EvolutionTimeline({ locale }: { locale: Locale }) {
  return <ol className="timeline">
    {[...catalog.milestones].sort((a, b) => a.date.localeCompare(b.date)).map((milestone) => {
      const content = catalog.locales[locale].entities[milestone.id]!;
      const evidence = catalog.evidence.find(({ id }) => milestone.evidenceIds.includes(id));
      const source = catalog.sources.find(({ id }) => id === evidence?.sourceId);
      return <li key={milestone.id}>
        <time dateTime={milestone.date} data-testid="milestone-date">{formatDate(milestone.date, locale)}</time>
        <div><h2>{content.title}</h2><p>{content.summary}</p>{source ? <a href={source.url} target="_blank" rel="noreferrer">{locale === "tr" ? "Birincil kaynak" : "Primary source"}<ExternalLink aria-hidden="true" /></a> : null}</div>
      </li>;
    })}
  </ol>;
}
