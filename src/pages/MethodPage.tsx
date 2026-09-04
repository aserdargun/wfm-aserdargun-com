import type { Locale } from "../data/types";
import { CATALOG_VERIFIED_ON, formatDate } from "../app/format";

const StatusGrid = ({ locale }: { locale: Locale }) => <div className="method-grid">
  {(locale === "tr" ? [
    ["Gösterildi", "Yöntem ve gözlemlenebilir sonuç içeren makale veya teknik rapor; bağımsız tekrar anlamına gelmez."],
    ["Bildirildi", "Bir kuruluşun, yeterli yöntem ayrıntısı yayımlamadan duyurduğu yetenek veya sonuç."],
    ["Çıkarım", "Atıf verilen kanıttan yapılan sınırlı editoryal çıkarım; gerekçe zorunludur."],
    ["Editoryal sentez", "Birden fazla kaynağı birleştiren alan yorumu; yöntem açıklaması zorunludur."],
  ] : [
    ["Demonstrated", "A paper or technical report with a method and observable result; this does not imply independent reproduction."],
    ["Reported", "A capability or result stated by an organization without enough published method."],
    ["Inferred", "A bounded editorial inference from cited evidence; rationale is required."],
    ["Editorial synthesis", "A field interpretation combining multiple sources; methodology is required."],
  ]).map(([title, text]) => <section key={title}><h2>{title}</h2><p>{text}</p></section>)}
</div>;

export function MethodPage({ locale }: { locale: Locale }) {
  return <article className="page method-page"><header className="page-header"><span className="eyebrow">{locale === "tr" ? "KANIT SÖZLEŞMESİ" : "EVIDENCE CONTRACT"}</span><h1>{locale === "tr" ? "Yöntem ve kaynak politikası" : "Method and source policy"}</h1><p>{locale === "tr" ? "Atlas, kaynak keşfi ile yayın kararını birbirinden ayırır. Otomatik tarama yalnız inceleme adayı üretir; hiçbir iddia insan onayı olmadan yayımlanmaz." : "The atlas separates source discovery from publication. Automated scanning only creates review candidates; no claim is published without human approval."}</p></header>
    <section><h2>{locale === "tr" ? "Kanıt durumu" : "Evidence status"}</h2><StatusGrid locale={locale} /></section>
    <section><h2>{locale === "tr" ? "Doğrulama durumu" : "Verification state"}</h2><p>{locale === "tr" ? "Güncel, güncelliğini yitirmiş, inceleme gerekli ve geri çekildi durumları kaynağın ne zaman ve nasıl kontrol edildiğini gösterir; iddianın kanıt gücünden ayrıdır." : "Current, stale, needs review, and withdrawn describe when and how a source was checked; they are separate from evidentiary strength."}</p></section>
    <section><h2>{locale === "tr" ? "Bilinmeyen değerler" : "Unknown values"}</h2><p>{locale === "tr" ? "Yayımlanmış kanıt yoksa değer sıfır veya başarısız sayılmaz; bilinmiyor olarak kalır. Farklı ölçütler tek bir olgunluk puanında birleştirilmez." : "When published evidence is absent, a value is not treated as zero or failure; it remains unknown. Unlike benchmarks are never collapsed into one maturity score."}</p></section>
    <section><h2>{locale === "tr" ? "Güncellik" : "Freshness"}</h2><p>{locale === "tr" ? `Son katalog doğrulaması: ${formatDate(CATALOG_VERIFIED_ON, locale)}. Kaynağa erişim hatası son onaylı içeriği korur; değişen kaynaklar sessizce yayımlanmak yerine inceleme kuyruğuna girer.` : `Last catalog verification: ${formatDate(CATALOG_VERIFIED_ON, locale)}. A source access failure preserves the last approved content; changed sources enter review instead of publishing silently.`}</p></section>
  </article>;
}
