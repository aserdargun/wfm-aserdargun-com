import { Check, Minus } from "lucide-react";
import { catalog } from "../../data/catalog";
import type { CapabilityValue, Locale, Model } from "../../data/types";

interface Props { locale: Locale; modelIds: string[]; }

const yes = (locale: Locale) => locale === "tr" ? "Var" : "Yes";
const unknown = (locale: Locale) => locale === "tr" ? "Bilinmiyor" : "Unknown";

function valueFor(model: Model, keys: string[], locale: Locale) {
  const value = keys.map((key) => model.capabilities[key]).find((item) => item !== undefined) as CapabilityValue | undefined;
  if (value === undefined || value === "unknown") return <span className="unknown-value"><Minus aria-hidden="true" />{unknown(locale)}</span>;
  if (typeof value === "boolean") return value ? <span className="yes-value"><Check aria-hidden="true" />{yes(locale)}</span> : <span className="unknown-value"><Minus aria-hidden="true" />{unknown(locale)}</span>;
  return `${value.value.toLocaleString(locale === "tr" ? "tr-TR" : "en-US")} ${value.unit}`;
}

export function ModelComparison({ locale, modelIds }: Props) {
  const models = modelIds.map((id) => catalog.models.find((model) => model.id === id)).filter((model): model is Model => Boolean(model));
  const rows = [
    { tr: "Yaklaşım", en: "Representation", render: (m: Model) => m.family },
    { tr: "Girdiler", en: "Inputs", render: (m: Model) => valueFor(m, ["multimodal", "multiSensor", "latentPrediction"], locale) },
    { tr: "Çıktılar", en: "Outputs", render: (m: Model) => valueFor(m, ["videoOutput", "pointCloudOutput", "latentDynamics"], locale) },
    { tr: "Eylem koşullama", en: "Action conditioning", render: (m: Model) => valueFor(m, ["actionConditioning"], locale) },
    { tr: "Planlama", en: "Planning", render: (m: Model) => valueFor(m, ["robotPlanning", "embodiedControl"], locale) },
    { tr: "Mekânsal / 3B", en: "Spatial / 3D", render: (m: Model) => valueFor(m, ["spatialGeneration", "pointCloudOutput", "multiView"], locale) },
    { tr: "Kalıcılık", en: "Persistence", render: (m: Model) => valueFor(m, ["persistentWorld"], locale) },
    { tr: "Uygulama", en: "Application", render: (m: Model) => m.family === "driving-world" ? (locale === "tr" ? "Sürüş" : "Driving") : m.family === "spatial-world" ? (locale === "tr" ? "Mekânsal üretim" : "Spatial creation") : (locale === "tr" ? "Genel araştırma" : "General research") },
    { tr: "Erişim", en: "Availability", render: (m: Model) => m.availability.weights },
    { tr: "Kanıt", en: "Evidence", render: (m: Model) => catalog.claims.find((claim) => claim.subjectId === m.id)?.evidenceStatus ?? unknown(locale) },
  ];
  return <div className="comparison-scroll" tabIndex={0}>
    <table className="model-comparison" aria-label={locale === "tr" ? "Model karşılaştırması" : "Model comparison"}>
      <thead><tr><th scope="col">{locale === "tr" ? "Boyut" : "Dimension"}</th>{models.map((model) => <th scope="col" key={model.id}>{catalog.locales[locale].entities[model.id]!.title}</th>)}</tr></thead>
      <tbody>{rows.map((row) => <tr key={row.en}><th scope="row">{locale === "tr" ? row.tr : row.en}</th>{models.map((model) => <td key={model.id}>{row.render(model)}</td>)}</tr>)}</tbody>
    </table>
  </div>;
}
