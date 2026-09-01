import { useSearchParams } from "react-router-dom";
import { FieldMap } from "../components/map/FieldMap";
import { SignalLog } from "../components/signals/SignalLog";
import type { Locale } from "../data/types";

interface Props { locale: Locale; }

export function HomePage({ locale }: Props) {
  const [params, setParams] = useSearchParams();
  const selectedId = params.get("stage") ?? "world-model";
  const select = (id: string) => {
    const next = new URLSearchParams(params);
    next.set("stage", id);
    setParams(next);
  };
  return <div className="home-page">
    <header className="home-hero">
      <div><span className="eyebrow">WORLD MODELS / 2026</span><h1>{locale === "tr" ? "Dilden fiziksel zekâya" : "From language to physical intelligence"}</h1><p>{locale === "tr" ? "Dünya modellerinin algı, tahmin, planlama ve eylem arasındaki rolünü birincil kaynaklar üzerinden izleyen yaşayan bir araştırma atlası." : "A living research atlas tracing how world models connect perception, prediction, planning, and action through primary sources."}</p></div>
      <div className="hero-stat"><strong>8</strong><span>{locale === "tr" ? "İzlenen model" : "Tracked models"}</span></div>
    </header>
    <FieldMap locale={locale} selectedId={selectedId} onSelect={select} />
    <section className="home-signals" aria-labelledby="recent-signals"><div className="home-signals__head"><h2 id="recent-signals">{locale === "tr" ? "Ne değişti" : "What changed"}</h2><a href={`/${locale}/signals`}>{locale === "tr" ? "Tüm sinyaller" : "All signals"}</a></div><SignalLog locale={locale} compact /></section>
  </div>;
}
