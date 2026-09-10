import { Check, Minus, X } from "lucide-react";
import { catalog } from "../../data/catalog";
import type { CapabilityValue, Locale, Model } from "../../data/types";
import { formatAvailability, formatEvidenceLabel, formatModelFamily } from "../../app/format";

interface Props { locale: Locale; modelIds: string[]; }

const yes = (locale: Locale) => locale === "tr" ? "Var" : "Yes";
const no = (locale: Locale) => locale === "tr" ? "Yok" : "No";
const unknown = (locale: Locale) => locale === "tr" ? "Bilinmiyor" : "Unknown";

function valueFor(model: Model, keys: string[], locale: Locale) {
  const values = keys.map((key) => model.capabilities[key]);
  const value = (values.some((item) => item === true) ? true : values.every((item) => item === false) ? false : values.find((item) => typeof item === "object") ?? "unknown") as CapabilityValue;
  if (value === undefined || value === "unknown") return <span className="unknown-value"><Minus aria-hidden="true" />{unknown(locale)}</span>;
  if (typeof value === "boolean") return value ? <span className="yes-value"><Check aria-hidden="true" />{yes(locale)}</span> : <span className="no-value"><X aria-hidden="true" />{no(locale)}</span>;
  return `${value.value.toLocaleString(locale === "tr" ? "tr-TR" : "en-US")} ${value.unit}`;
}

export function ModelComparison({ locale, modelIds }: Props) {
  const models = modelIds.map((id) => catalog.models.find((model) => model.id === id)).filter((model): model is Model => Boolean(model));
  const rows = [
    { tr: "Yaklaşım", en: "Representation", render: (m: Model) => formatModelFamily(locale, m.family) },
    { tr: "Gizil tahmin / dinamikler", en: "Latent prediction / dynamics", render: (m: Model) => valueFor(m, ["latentPrediction", "latentDynamics"], locale) },
    { tr: "Video çıktısı", en: "Video output", render: (m: Model) => valueFor(m, ["videoOutput"], locale) },
    { tr: "Nokta bulutu çıktısı", en: "Point-cloud output", render: (m: Model) => valueFor(m, ["pointCloudOutput"], locale) },
    { tr: "Eylemle koşullama", en: "Action conditioning", render: (m: Model) => valueFor(m, ["actionConditioning"], locale) },
    { tr: "Planlama", en: "Planning", render: (m: Model) => valueFor(m, ["robotPlanning", "embodiedControl"], locale) },
    { tr: "Mekânsal / 3B", en: "Spatial / 3D", render: (m: Model) => valueFor(m, ["spatialGeneration", "pointCloudOutput", "multiView"], locale) },
    { tr: "Kalıcılık", en: "Persistence", render: (m: Model) => valueFor(m, ["persistentWorld"], locale) },
    { tr: "Uygulama", en: "Application", render: (m: Model) => m.family === "driving-world" ? (locale === "tr" ? "Sürüş" : "Driving") : m.family === "spatial-world" ? (locale === "tr" ? "Mekânsal üretim" : "Spatial creation") : (locale === "tr" ? "Genel araştırma" : "General research") },
    { tr: "Ağırlık erişimi", en: "Weight availability", render: (m: Model) => formatAvailability(locale, m.availability.weights) },
    { tr: "Kod erişimi", en: "Code availability", render: (m: Model) => formatAvailability(locale, m.availability.code) },
    { tr: "API erişimi", en: "API availability", render: (m: Model) => formatAvailability(locale, m.availability.api) },
    { tr: "Kanıt", en: "Evidence", render: (m: Model) => {
      const value = catalog.claims.find((claim) => claim.subjectId === m.id)?.evidenceStatus;
      return value ? formatEvidenceLabel(locale, value) : unknown(locale);
    } },
  ];
  return <div className="comparison-scroll" role="region" aria-label={locale === "tr" ? "Kaydırılabilir model karşılaştırması" : "Scrollable model comparison"} tabIndex={0}>
    <table className="model-comparison" aria-label={locale === "tr" ? "Model karşılaştırması" : "Model comparison"}>
      <thead><tr><th scope="col">{locale === "tr" ? "Boyut" : "Dimension"}</th>{models.map((model) => <th scope="col" key={model.id}><a href={`/${locale}/models/${catalog.locales[locale].entities[model.id]!.slug}`}>{catalog.locales[locale].entities[model.id]!.title}</a></th>)}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.en}><th scope="row">{locale === "tr" ? row.tr : row.en}</th>{models.map((model) => <td key={model.id}>{row.render(model)}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
