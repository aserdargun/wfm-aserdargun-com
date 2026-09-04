import type { Locale } from "../../data/types";
import { catalog } from "../../data/catalog";

interface Props {
  locale: Locale;
  capability: string | null;
  compare: string[];
  onCapabilityChange: (value: string | null) => void;
  onCompareChange: (id: string, checked: boolean) => void;
}

export function ModelFilters({ locale, capability, compare, onCapabilityChange, onCompareChange }: Props) {
  const featuredComparisonIds = ["atlas", "oasis-3", "cosmos-3", "v-jepa-2", "genie-3"];
  return <aside className="model-filters" aria-label={locale === "tr" ? "Model filtreleri" : "Model filters"}>
    <fieldset><legend>{locale === "tr" ? "Yetenek" : "Capability"}</legend>
      <label><input type="checkbox" checked={capability === "spatial-3d"} onChange={(event) => onCapabilityChange(event.target.checked ? "spatial-3d" : null)} /> {locale === "tr" ? "Mekânsal / 3B" : "Spatial / 3D"}</label>
      <label><input type="checkbox" checked={capability === "action-conditioning"} onChange={(event) => onCapabilityChange(event.target.checked ? "action-conditioning" : null)} /> {locale === "tr" ? "Eylemle koşullama" : "Action conditioning"}</label>
    </fieldset>
    <fieldset><legend>{locale === "tr" ? "Karşılaştır" : "Compare"}</legend>
      {featuredComparisonIds.map((id) => <label key={id}><input type="checkbox" checked={compare.includes(id)} onChange={(event) => onCompareChange(id, event.target.checked)} />{catalog.locales[locale].entities[id]!.title}</label>)}
    </fieldset>
  </aside>;
}
