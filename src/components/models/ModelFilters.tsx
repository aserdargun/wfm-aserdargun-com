import { formatModelFamily } from "../../app/format";
import type { Locale } from "../../data/types";
import { catalog } from "../../data/catalog";

interface Props {
  locale: Locale;
  capability: string | null;
  family: string | null;
  onFamilyChange: (value: string | null) => void;
  compare: string[];
  onCapabilityChange: (value: string | null) => void;
  onCompareChange: (id: string, checked: boolean) => void;
}

export function ModelFilters({ locale, family, onFamilyChange, capability, compare, onCapabilityChange, onCompareChange }: Props) {

  return <aside className="model-filters" aria-label={locale === "tr" ? "Model filtreleri" : "Model filters"}>
    <label className="family-filter">{locale === "tr" ? "Model ailesi" : "Model family"}<select value={family ?? ""} onChange={(event) => onFamilyChange(event.target.value || null)}><option value="">{locale === "tr" ? "Tüm aileler" : "All families"}</option>{[...new Set(catalog.models.map(({ family }) => family))].map((value) => <option key={value} value={value}>{formatModelFamily(locale, value)}</option>)}</select></label>
    <fieldset><legend>{locale === "tr" ? "Yetenek" : "Capability"}</legend>
      <label><input type="checkbox" checked={capability === "spatial-3d"} onChange={(event) => onCapabilityChange(event.target.checked ? "spatial-3d" : null)} /> {locale === "tr" ? "Mekânsal / 3B" : "Spatial / 3D"}</label>
      <label><input type="checkbox" checked={capability === "action-conditioning"} onChange={(event) => onCapabilityChange(event.target.checked ? "action-conditioning" : null)} /> {locale === "tr" ? "Eylemle koşullama" : "Action conditioning"}</label>
    </fieldset>
    <fieldset><legend>{locale === "tr" ? "Karşılaştır" : "Compare"}</legend>
      <p className="filter-help">{locale === "tr" ? `${compare.length}/4 model seçildi` : `${compare.length}/4 models selected`}</p>
      {catalog.models.map(({ id }) => <label key={id}><input type="checkbox" disabled={compare.length >= 4 && !compare.includes(id)} checked={compare.includes(id)} onChange={(event) => onCompareChange(id, event.target.checked)} />{catalog.locales[locale].entities[id]!.title}</label>)}
    </fieldset>
  </aside>;
}
