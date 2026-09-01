import { CircleDotDashed, ShieldCheck } from "lucide-react";
import { getLocaleCounterpart } from "../../app/locale";
import type { Locale } from "../../data/types";

const verifiedLabel = (locale: Locale, date: string) => {
  if (date === "2026-09-01") return locale === "tr" ? "1 Eyl 2026" : "Sep 1 2026";
  return date;
};

interface TopUtilityBarProps {
  locale: Locale;
  currentPath: string;
  lastVerified: string;
}

export function TopUtilityBar({ locale, currentPath, lastVerified }: TopUtilityBarProps) {
  const counterpart = locale === "tr" ? "en" : "tr";
  return <header className="topbar">
    <a className="brand" href={`/${locale}`} aria-label="World Models Atlas">
      <CircleDotDashed aria-hidden="true" />
      <span>WORLD MODELS ATLAS</span>
    </a>
    <div className="topbar__utilities">
      <span className="verified"><span className="status-dot" aria-hidden="true" />{locale === "tr" ? "Son doğrulama" : "Last verified"}: <strong>{verifiedLabel(locale, lastVerified)}</strong></span>
      <a className="policy-link" href={`/${locale}/method`}><ShieldCheck aria-hidden="true" />{locale === "tr" ? "Birincil kaynak politikası" : "Primary-source policy"}</a>
      <a className="locale-switch" href={getLocaleCounterpart(currentPath, counterpart)} lang={counterpart}>
        {counterpart === "en" ? "English" : "Türkçe"}
      </a>
    </div>
  </header>;
}
