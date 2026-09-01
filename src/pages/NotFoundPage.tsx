import type { Locale } from "../data/types";

export function NotFoundPage({ locale }: { locale: Locale }) {
  return <div className="page"><header className="page-header"><span className="eyebrow">404</span><h1>{locale === "tr" ? "Bu kayıt bulunamadı" : "This record was not found"}</h1><p>{locale === "tr" ? "Bağlantı değişmiş veya kayıt henüz yayımlanmamış olabilir." : "The link may have changed or the record may not be published yet."}</p><a className="text-link" href={`/${locale}`}>{locale === "tr" ? "Alan haritasına dön" : "Return to the field map"}</a></header></div>;
}
