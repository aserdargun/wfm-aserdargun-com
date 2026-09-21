import type { Locale } from "../types";

interface PortfolioCopy {
  title: string;
  summary: string;
  boundary: string;
  rootLabel: string;
  twinLabel: string;
}

export const portfolioCopy: Record<Locale, PortfolioCopy> = {
  tr: {
    title: "aserdargun.com içinde WFM",
    summary: "WFM, AI Learning System’in fiziksel yapay zekâ katmanında bir araştırma atlasıdır. Kaynakları burada incele, tahmin ve eylem ilişkisini WML’de dene; varlık kaydı, kanıt ve insan denetimi konularını ITL’de takip et.",
    boundary: "Bu bağlantılar bir öğrenme yolunu gösterir. Uygulamalar bağımsız çalışır; ortak telemetri veya otomatik kontrol bağlantısı ifade etmez. ITL’nin örnekleri sentetik eğitim kayıtlarıdır.",
    rootLabel: "AI Learning System’i keşfet",
    twinLabel: "ITL · Endüstriyel İkiz Laboratuvarı",
  },
  en: {
    title: "WFM within aserdargun.com",
    summary: "WFM is a research atlas in the physical AI layer of the AI Learning System. Read the sources here, explore prediction and action in WML, then follow asset records, evidence, and human oversight in ITL.",
    boundary: "These links describe a learning path. The applications run independently; they do not imply shared telemetry or automatic control. ITL examples are synthetic teaching records.",
    rootLabel: "Explore the AI Learning System",
    twinLabel: "ITL · Industrial Twin Lab",
  },
};

export const portfolioHome = (locale: Locale) => `https://aserdargun.com/${locale === "tr" ? "tr/" : ""}`;
