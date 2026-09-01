import type { EvidenceStatus, Locale, VerificationState } from "../../data/types";

interface EvidenceTokenProps {
  locale: Locale;
  kind: "evidence" | "verification";
  value: EvidenceStatus | VerificationState;
}

const labels = {
  en: { demonstrated: "Demonstrated", reported: "Reported", inferred: "Inferred", "editorial-synthesis": "Editorial synthesis", current: "Current", stale: "Stale", "needs-review": "Needs review", withdrawn: "Withdrawn" },
  tr: { demonstrated: "Gösterildi", reported: "Bildirildi", inferred: "Çıkarım", "editorial-synthesis": "Editoryal sentez", current: "Güncel", stale: "Bayat", "needs-review": "İnceleme gerekli", withdrawn: "Geri çekildi" },
} as const;

const shapes: Record<EvidenceStatus | VerificationState, string> = {
  demonstrated: "✓", reported: "!", inferred: "◇", "editorial-synthesis": "◆",
  current: "●", stale: "◷", "needs-review": "△", withdrawn: "×",
};

export function EvidenceToken({ locale, kind, value }: EvidenceTokenProps) {
  return <span className={`evidence-token evidence-token--${value}`} data-kind={kind}>
    <span aria-hidden="true">{shapes[value]}</span>{labels[locale][value]}
  </span>;
}
