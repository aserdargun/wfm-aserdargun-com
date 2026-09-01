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
        <button type="button" aria-label={`${stage.id === "world-model" ? "World Model" : content.title} — ${locale === "tr" ? "ayrıntıyı göster" : "show detail"}`} onClick={() => onSelect(stage.id)}>{stage.id === "world-model" ? "World Model" : content.title}</button>
        <p>{content.summary}</p>
      </li>;
    })}
  </ol>;
}
