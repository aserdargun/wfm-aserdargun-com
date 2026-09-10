import { catalog } from "../../data/catalog";
import type { Locale } from "../../data/types";

interface Props {
  locale: Locale;
  selectedId: string;
  onSelect: (id: string) => void;
}

export function FieldMapTextAlternative({ locale, selectedId, onSelect }: Props) {
  const stages = catalog.concepts.filter(({ featured }) => featured);
  return <ol className="field-path-mobile" aria-label={locale === "tr" ? "Teknoloji öğrenme yolu" : "Technology learning path"}>
    {stages.map((stage, index) => {
      const content = catalog.locales[locale].entities[stage.id]!;
      return <li key={stage.id} className={stage.id === selectedId ? "is-selected" : ""}>
        <span className="stage-index">{String(index + 1).padStart(2, "0")}</span>
        <button type="button" aria-label={content.title} aria-pressed={stage.id === selectedId} onClick={() => onSelect(stage.id)}>{content.title}</button>
        <p>{content.summary}</p>
        {stage.id === selectedId ? <a className="mobile-evidence-link" href="#evidence-inspector">{locale === "tr" ? "Seçili katmanın kanıtını incele" : "Inspect evidence for this layer"}</a> : null}
      </li>;
    })}
  </ol>;
}
