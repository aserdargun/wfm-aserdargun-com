import { useSearchParams } from "react-router-dom";
import { ModelComparison } from "../components/models/ModelComparison";
import { ModelFilters } from "../components/models/ModelFilters";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { parseAtlasUrl, serializeAtlasUrl } from "../app/url-state";
import { matchesCapability } from "../data/capabilities";
import { formatDate } from "../app/format";

export function ModelIndexPage({ locale }: { locale: Locale }) {
  const [params, setParams] = useSearchParams();
  const state = parseAtlasUrl(new URL(`/${locale}/models?${params}`, "https://atlas.local"));
  const capability = state.capability ?? null;
  const compare = state.compare;
  const visible = catalog.models.filter((model) => matchesCapability(model, capability) && (!state.family || model.family === state.family));
  const update = (next: typeof state) => setParams(serializeAtlasUrl(next).split("?")[1] ?? "");
  const setCapability = (value: string | null) => { const next = { ...state }; if (value) next.capability = value; else delete next.capability; update(next); };
  const setFamily = (value: string | null) => { const next = { ...state }; if (value) next.family = value; else delete next.family; update(next); };
  const setCompare = (id: string, checked: boolean) => {
    const nextValues = checked ? [...new Set([...compare, id])] : compare.filter((value) => value !== id);
    if (nextValues.length > 4) return;
    update({ ...state, compare: catalog.models.filter((model) => nextValues.includes(model.id)).map(({ id }) => id) });
  };
  return <div className="page"><header className="page-header"><span className="eyebrow">{locale === "tr" ? "KARŞILAŞTIRMALI ARAŞTIRMA" : "COMPARATIVE RESEARCH"}</span><h1>{locale === "tr" ? "Model aileleri" : "Model families"}</h1><p>{locale === "tr" ? "Temsil, eylem koşullama, mekânsal çıktı ve erişim biçimlerini tek bir puana indirgemeden karşılaştırın." : "Compare representation, action conditioning, spatial output, and availability without collapsing unlike evidence into one score."}</p></header>
    <div className="model-explorer"><ModelFilters locale={locale} family={state.family ?? null} onFamilyChange={setFamily} capability={capability} compare={compare} onCapabilityChange={setCapability} onCompareChange={setCompare} /><div className="model-results"><p className="result-count" role="status">{visible.length} {locale === "tr" ? "model" : "models"}</p><div className="model-list">{visible.map((model) => { const item = catalog.locales[locale].entities[model.id]!; return <a href={`/${locale}/models/${item.slug}`} key={model.id}><span>{model.organization} · {formatDate(model.releaseDate, locale)}</span><h2>{item.title}</h2><p>{item.summary}</p></a>; })}</div></div></div>
    {compare.length ? <section className="comparison-section"><h2>{locale === "tr" ? "Seçili karşılaştırma" : "Selected comparison"}</h2><ModelComparison locale={locale} modelIds={compare} /></section> : null}<p className="sr-only" role="status">{compare.length === 4 ? (locale === "tr" ? "Dört model sınırına ulaşıldı" : "Four-model limit reached") : ""}</p>
  </div>;
}
