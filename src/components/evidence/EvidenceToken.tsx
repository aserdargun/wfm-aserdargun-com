import type { EvidenceStatus, Locale, VerificationState } from "../../data/types";
import { formatEvidenceLabel } from "../../app/format";

interface EvidenceTokenProps {
  locale: Locale;
  kind: "evidence" | "verification";
  value: EvidenceStatus | VerificationState;
}

const shapes: Record<EvidenceStatus | VerificationState, string> = {
  demonstrated: "✓", reported: "!", inferred: "◇", "editorial-synthesis": "◆",
  current: "●", stale: "◷", "needs-review": "△", withdrawn: "×",
};

export function EvidenceToken({ locale, kind, value }: EvidenceTokenProps) {
  return <span className={`evidence-token evidence-token--${value}`} data-kind={kind}>
    <span aria-hidden="true">{shapes[value]}</span>{formatEvidenceLabel(locale, value)}
  </span>;
}
