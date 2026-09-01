import { useSearchParams } from "react-router-dom";
import { ModelComparison } from "../components/models/ModelComparison";
import { ModelFilters } from "../components/models/ModelFilters";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";

export function ModelIndexPage({ locale }: { locale: Locale }) {
  const [params, setParams] = useSearchParams();
  const capability = params.get("capability");
  const compare = [...new Set((params.get("compare") ?? "").split(",").filter((id) => catalog.models.some((model) => model.id === id)))];
  const visible = capability === "spatial-3d" ? catalog.models.filter(({ capabilities }) => capabilities.spatialGeneration || capabilities.pointCloudOutput || capabilities.multiView) : catalog.models;
  const setCapability = (value: string | null) => { const next = new URLSearchParams(params); value ? next.set("capability", value) : next.delete("capability"); setParams(next); };
  const setCompare = (id: string, checked: boolean) => {
    const nextValues = checked ? [...compare, id] : compare.filter((value) => value !== id);
    if (nextValues.length > 4) return;
    const next = new URLSearchParams(params); nextValues.length ? next.set("compare", nextValues.join(",")) : next.delete("compare"); setParams(next);
  };
  return <div className="page"><header className="page-header"><span className="eyebrow">{locale === "tr" ? "KARŞILAŞTIRMALI ARAŞTIRMA" : "COMPARATIVE RESEARCH"}</span><h1>{locale === "tr" ? "Model aileleri" : "Model families"}</h1><p>{locale === "tr" ? "Temsil, eylem koşullama, mekânsal çıktı ve erişim biçimlerini tek bir puana indirgemeden karşılaştırın." : "Compare representation, action conditioning, spatial output, and availability without collapsing unlike evidence into one score."}</p></header>
    <div className="model-explorer"><ModelFilters locale={locale} capability={capability} compare={compare} onCapabilityChange={setCapability} onCompareChange={setCompare} /><div className="model-results"><p className="result-count">{visible.length} {locale === "tr" ? "model" : "models"}</p><div className="model-list">{visible.map((model) => { const item = catalog.locales[locale].entities[model.id]!; return <a href={`/${locale}/models/${item.slug}`} key={model.id}><span>{model.organization} · {model.releaseDate}</span><h2>{item.title}</h2><p>{item.summary}</p></a>; })}</div></div></div>
    {compare.length ? <section className="comparison-section"><h2>{locale === "tr" ? "Seçili karşılaştırma" : "Selected comparison"}</h2><ModelComparison locale={locale} modelIds={compare} /></section> : null}<p className="sr-only" role="status">{compare.length === 4 ? (locale === "tr" ? "Dört model sınırına ulaşıldı" : "Four-model limit reached") : ""}</p>
  </div>;
}
