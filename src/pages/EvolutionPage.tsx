import { EvolutionTimeline } from "../components/timeline/EvolutionTimeline";
import type { Locale } from "../data/types";

export function EvolutionPage({ locale }: { locale: Locale }) {
  return <div className="page"><header className="page-header"><span className="eyebrow">2018 → 2026</span><h1>{locale === "tr" ? "Dünya modellerinin evrimi" : "Evolution of world models"}</h1><p>{locale === "tr" ? "Gizil ortam temsillerinden etkileşimli video, sürüş ve mekânsal dünya üretimine uzanan seçili birincil kaynak dönüm noktaları." : "Selected primary-source milestones from latent environment representations to interactive video, driving, and spatial world generation."}</p></header><EvolutionTimeline locale={locale} /></div>;
}
