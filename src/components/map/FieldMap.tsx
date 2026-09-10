import { useRef } from "react";
import { catalog } from "../../data/catalog";
import type { Locale } from "../../data/types";
import { FieldMapTextAlternative } from "./FieldMapTextAlternative";

interface FieldMapProps {
  locale: Locale;
  selectedId: string;
  onSelect: (id: string) => void;
}

export function FieldMap({ locale, selectedId, onSelect }: FieldMapProps) {
  const stages = catalog.concepts.filter(({ featured }) => featured);
  const refs = useRef<Array<HTMLButtonElement | null>>([]);
  const description = locale === "tr"
    ? "Bu sıralama zorunlu bir mimari değil, alanı okumak için bir yoldur; sistemler katmanları atlayabilir veya geri besleme kurabilir."
    : "This sequence is a reading path, not a mandatory architecture; systems may skip layers or create feedback loops.";
  const relationDescriptions = locale === "tr" ? [
    "Büyük dil modeli, görsel-dil modeline bilgi sağlar.",
    "Görsel-dil modeli, dünya modeline bilgi sağlar.",
    "Dünya modeli, planlayıcı için tahmin üretir.",
    "Planlayıcı, ajanla birlikte plan yapar.",
    "Ajan, fiziksel yapay zekâ üzerinden eyleme geçer.",
    "Dijital ikiz, dünya modelini geri besler.",
  ] : [
    "LLM informs VLM.",
    "VLM informs the world model.",
    "The world model predicts for the planner.",
    "The planner plans with the agent.",
    "The agent acts through physical AI.",
    "The digital twin feeds back to the world model.",
  ];

  return <section className="field-map" aria-labelledby="field-map-title" aria-describedby="field-map-description field-map-relations">
    <div className="section-heading-row">
      <div>
        <span className="eyebrow">{locale === "tr" ? "TEKNOLOJİ ALANI" : "TECHNOLOGY FIELD"}</span>
        <h2 id="field-map-title">{locale === "tr" ? "Tahmin, planlama ve eylem katmanları" : "Layers of prediction, planning, and action"}</h2>
      </div>
      <span className="map-legend"><i aria-hidden="true" />{locale === "tr" ? "Seçili" : "Selected"}</span>
    </div>
    <p id="field-map-description" className="map-description">{description}</p>
    <div className="field-map__desktop">
      <svg className="map-lines" viewBox="0 0 1120 330" role="img" aria-label={locale === "tr" ? "Katmanlar arasındaki yönlü ilişkiler" : "Directed relationships between layers"}>
        <defs><marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" /></marker></defs>
        <path d="M115 120 H265" /><path d="M300 120 H450" /><path d="M485 120 H635" /><path d="M670 120 H820" /><path d="M855 120 H1005" />
        <path className="feedback-line" d="M1005 178 C900 300 610 305 485 190" />
      </svg>
      <div className="stage-grid">
        {stages.map((stage, index) => {
          const content = catalog.locales[locale].entities[stage.id]!;
          const label = content.title;
          return <button
            key={stage.id}
            ref={(node) => { refs.current[index] = node; }}
            type="button"
            aria-label={label}
            className={`stage-node stage-node--${index + 1}${selectedId === stage.id ? " is-selected" : ""}`}
            data-testid="primary-stage"
            aria-pressed={selectedId === stage.id}
            onClick={() => onSelect(stage.id)}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                event.preventDefault();
                const direction = event.key === "ArrowRight" ? 1 : -1;
                refs.current[(index + direction + stages.length) % stages.length]?.focus();
              }
            }}
          >
            <span className="stage-node__index">{String(index + 1).padStart(2, "0")}</span>
            <strong>{label}</strong>
            <small>{content.summary}</small>
          </button>;
        })}
      </div>
    </div>
    <FieldMapTextAlternative locale={locale} selectedId={selectedId} onSelect={onSelect} />
    <ul id="field-map-relations" className="sr-only">
      {relationDescriptions.map((description) => <li key={description}>{description}</li>)}
    </ul>
  </section>;
}
