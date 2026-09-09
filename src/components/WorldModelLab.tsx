import { ArrowUpRight } from "lucide-react";
import type { Locale } from "../data/types";

export function WorldModelLab({ locale }: { locale: Locale }) {
  const tr = locale === "tr";
  return <section className="world-model-lab" aria-labelledby="wml-heading">
    <span className="eyebrow">{tr ? "ARAŞTIRMADAN DENEYE" : "FROM RESEARCH TO EXPERIMENT"}</span>
    <h2 id="wml-heading">{tr ? "WML · Dünya Modeli Laboratuvarı" : "WML · World Model Laboratory"}</h2>
    <p>{tr
      ? "WFM’de araştırdığın algı, tahmin, planlama ve eylem ilişkisini WML’de deneyimle. Etkileşimli fizik sahnelerinde tahminleri simülasyonda gerçekleşen sonuçlarla karşılaştır; aynı karar noktasından farklı bir eylemin sonucunu incele."
      : "Explore the connection between perception, prediction, planning, and action studied in WFM through experiments in WML. Compare predictions with simulated outcomes in interactive physics scenes, then explore a different action from the same decision point."}</p>
    <p className="world-model-lab__scope">{tr
      ? "Eğitim amaçlı simülasyon: WML basitleştirilmiş tahmin modelleri kullanır; öğrenilmiş temel dünya modellerinin performansını veya gerçek dünyaya aktarımı doğrulamaz."
      : "Educational simulation: WML uses simplified predictors; it does not validate the performance of learned foundation world models or transfer to the real world."}</p>
    <a className="text-link world-model-lab__link" href="https://wml.aserdargun.com/">{tr ? "WML’de deneyi aç" : "Open the experiment in WML"}<ArrowUpRight size={16} aria-hidden="true" /></a>
  </section>;
}
