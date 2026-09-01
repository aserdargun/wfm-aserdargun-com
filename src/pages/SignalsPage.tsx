import { SignalLog } from "../components/signals/SignalLog";
import type { Locale } from "../data/types";

export function SignalsPage({ locale }: { locale: Locale }) {
  return <div className="page"><header className="page-header"><span className="eyebrow">{locale === "tr" ? "ONAYLI DEĞİŞİKLİK GÜNLÜĞÜ" : "APPROVED CHANGE LOG"}</span><h1>{locale === "tr" ? "Araştırma sinyalleri" : "Research signals"}</h1><p>{locale === "tr" ? "Yalnızca küratör tarafından incelenmiş, iki dilde düzenlenmiş ve doğrudan birincil kaynağa bağlanmış gelişmeler." : "Only developments reviewed by the curator, edited in both languages, and linked directly to a primary source."}</p></header><SignalLog locale={locale} /></div>;
}
