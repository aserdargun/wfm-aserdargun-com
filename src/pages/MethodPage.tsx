import { PortfolioContext } from "../components/PortfolioContext";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { LATEST_SOURCE_CHECK, OLDEST_SOURCE_CHECK, formatDate } from "../app/format";

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
    <section><h2>{locale === "tr" ? "Güncellik" : "Freshness"}</h2><p>{locale === "tr" ? `Son kaynak kontrolü: ${formatDate(LATEST_SOURCE_CHECK, locale)}. En eski kaynak kontrolü: ${formatDate(OLDEST_SOURCE_CHECK, locale)}. Kaynağa erişim hatası son onaylı içeriği korur; değişen kaynaklar sessizce yayımlanmak yerine inceleme kuyruğuna girer.` : `Latest source check: ${formatDate(LATEST_SOURCE_CHECK, locale)}. Oldest source check: ${formatDate(OLDEST_SOURCE_CHECK, locale)}. A source access failure preserves the last approved content; changed sources enter review instead of publishing silently.`}</p></section>
    <section><h2>{locale === "tr" ? "Katalog kapsamı" : "Catalog coverage"}</h2><p>{locale === "tr"
      ? `${catalog.concepts.length} kavram, ${catalog.models.length} model, ${catalog.sources.length} birincil kaynak ve ${catalog.signals.length} onaylı sinyal. Son kontrol tarihi, bütün iddiaların güncel veya bağımsız olarak tekrarlanmış olduğu anlamına gelmez. Her kaydın kendi kanıt ve doğrulama etiketini okuyun.`
      : `${catalog.concepts.length} concepts, ${catalog.models.length} models, ${catalog.sources.length} primary sources, and ${catalog.signals.length} approved signals. The latest check date does not mean every claim is current or independently reproduced. Read each record’s evidence and verification labels.`}</p><p>{locale === "tr"
      ? "Doğrulanamayan yayın ve olay tarihleri bilinmiyor olarak gösterilir; tarihsiz kayıtlar zaman çizelgesinin sonunda yer alır. Erişim bilgisi kaynakta bildirilen durumu yansıtır; API testi veya kullanım hakkı garantisi değildir."
      : "Unverified publication and event dates are shown as unknown; undated records appear at the end of the timeline. Availability reflects the cited source; it is not an API test or a guarantee of access."}</p><a className="text-link" href="/research-export.json" download>{locale === "tr" ? "Onaylı araştırma verisini indir (JSON)" : "Download approved research data (JSON)"}</a></section>
    <PortfolioContext locale={locale} />
  </article>;
}
