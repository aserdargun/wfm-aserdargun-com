import type { Locale } from "../../data/types";

interface Props {
  locale: Locale;
  capability: string | null;
  compare: string[];
  onCapabilityChange: (value: string | null) => void;
  onCompareChange: (id: string, checked: boolean) => void;
}

export function ModelFilters({ locale, capability, compare, onCapabilityChange, onCompareChange }: Props) {
  return <aside className="model-filters" aria-label={locale === "tr" ? "Model filtreleri" : "Model filters"}>
    <fieldset><legend>{locale === "tr" ? "Yetenek" : "Capability"}</legend>
      <label><input type="checkbox" checked={capability === "spatial-3d"} onChange={(event) => onCapabilityChange(event.target.checked ? "spatial-3d" : null)} /> Spatial / 3D</label>
      <label><input type="checkbox" checked={capability === "action-conditioning"} onChange={(event) => onCapabilityChange(event.target.checked ? "action-conditioning" : null)} /> {locale === "tr" ? "Eylem koşullama" : "Action conditioning"}</label>
    </fieldset>
    <fieldset><legend>{locale === "tr" ? "Karşılaştır" : "Compare"}</legend>
      {["atlas", "v-jepa-2", "genie-3", "cosmos-3"].map((id) => <label key={id}><input type="checkbox" checked={compare.includes(id)} onChange={(event) => onCompareChange(id, event.target.checked)} />{id === "v-jepa-2" ? "V-JEPA 2" : id === "genie-3" ? "Genie 3" : id === "cosmos-3" ? "Cosmos 3" : "Atlas"}</label>)}
    </fieldset>
  </aside>;
}
