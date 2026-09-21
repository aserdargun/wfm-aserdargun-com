import type { Locale } from "../types";

export const sourceReviewNotes = {
  "source-decart-oasis3": {
    en: "2026-09-21: The primary page supports the reported capabilities and API access, but does not establish an original publication or release date. Dates remain unknown and the record remains under review. Review scope: hero, How it works, and FAQ text at decart.ai/oasis, continuing the scope recorded on 2026-09-18. Embedded videos and deeper help-center pages were not reviewed. Latency, physics-engine fidelity, and sim-to-real transfer were not independently measured or validated.",
    tr: "2026-09-21: Birincil sayfa bildirilen yetenekleri ve API erişimini destekliyor; ancak ilk yayın veya çıkış tarihini doğrulamıyor. Tarihler bilinmiyor olarak tutuluyor ve kayıt incelemede kalıyor. İnceleme kapsamı: decart.ai/oasis adresindeki giriş, How it works ve FAQ metinleri; 18 Eyl 2026 tarihinde kaydedilen kapsam sürdürülüyor. Gömülü videolar ve yardım merkezinin derin sayfaları incelenmedi. Gecikme, fizik motoru doğruluğu ve simülasyondan gerçeğe aktarım bağımsız ölçülmedi veya doğrulanmadı.",
  },
} satisfies Record<string, Record<Locale, string>>;
