import type {
  Availability,
  Concept,
  EvidenceStatus,
  Locale,
  Model,
  RelationKind,
  VerificationState,
} from "../data/types";

export const CATALOG_VERIFIED_ON = "2026-09-04";

const localeTag = (locale: Locale) => locale === "tr" ? "tr-TR" : "en-US";

export function formatDate(value: string, locale: Locale): string {
  return new Intl.DateTimeFormat(localeTag(locale), {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00.000Z`));
}

const conceptFamilyLabels: Record<Locale, Record<Concept["family"], string>> = {
  en: {
    foundation: "Foundation",
    perception: "Perception",
    simulation: "Simulation",
    planning: "Planning",
    agency: "Agency",
    embodiment: "Embodiment",
    systems: "Systems",
  },
  tr: {
    foundation: "Temel modeller",
    perception: "Algı",
    simulation: "Benzetim",
    planning: "Planlama",
    agency: "Ajanlık",
    embodiment: "Bedenlenme",
    systems: "Sistemler",
  },
};

const modelFamilyLabels: Record<Locale, Record<Model["family"], string>> = {
  en: {
    "latent-dynamics": "Latent dynamics",
    "video-world": "Video world",
    "spatial-world": "Spatial world",
    "driving-world": "Driving world",
    "generalist-world": "Generalist world",
  },
  tr: {
    "latent-dynamics": "Gizil dinamikler",
    "video-world": "Video dünyası",
    "spatial-world": "Mekânsal dünya",
    "driving-world": "Sürüş dünyası",
    "generalist-world": "Genel amaçlı dünya",
  },
};

const availabilityLabels: Record<Locale, Record<Availability, string>> = {
  en: {
    public: "Publicly available",
    "open-weights": "Open weights",
    "open-code": "Open code",
    api: "API available",
    "limited-preview": "Limited preview",
    closed: "Closed",
    unknown: "Unknown",
  },
  tr: {
    public: "Herkese açık",
    "open-weights": "Açık ağırlıklar",
    "open-code": "Açık kod",
    api: "API erişimi var",
    "limited-preview": "Sınırlı ön izleme",
    closed: "Kapalı",
    unknown: "Bilinmiyor",
  },
};

const relationLabels: Record<Locale, Record<RelationKind, string>> = {
  en: {
    precedes: "precedes",
    informs: "informs",
    predicts: "predicts for",
    "plans-with": "plans with",
    "acts-through": "acts through",
    "feeds-back-to": "feeds back to",
    "alternative-to": "is an alternative to",
    contains: "contains",
  },
  tr: {
    precedes: "önce gelir",
    informs: "bilgi sağlar",
    predicts: "tahmin üretir",
    "plans-with": "birlikte planlar",
    "acts-through": "üzerinden eyleme geçer",
    "feeds-back-to": "geri besler",
    "alternative-to": "alternatifidir",
    contains: "içerir",
  },
};

const evidenceLabels: Record<Locale, Record<EvidenceStatus | VerificationState, string>> = {
  en: {
    demonstrated: "Demonstrated",
    reported: "Reported",
    inferred: "Inferred",
    "editorial-synthesis": "Editorial synthesis",
    current: "Current",
    stale: "Stale",
    "needs-review": "Needs review",
    withdrawn: "Withdrawn",
  },
  tr: {
    demonstrated: "Gösterildi",
    reported: "Bildirildi",
    inferred: "Çıkarım",
    "editorial-synthesis": "Editoryal sentez",
    current: "Güncel",
    stale: "Güncelliğini yitirmiş",
    "needs-review": "İnceleme gerekli",
    withdrawn: "Geri çekildi",
  },
};

export const formatConceptFamily = (locale: Locale, value: Concept["family"]) => conceptFamilyLabels[locale][value];
export const formatModelFamily = (locale: Locale, value: Model["family"]) => modelFamilyLabels[locale][value];
export const formatAvailability = (locale: Locale, value: Availability) => availabilityLabels[locale][value];
export const formatRelation = (locale: Locale, value: RelationKind) => relationLabels[locale][value];
export const formatEvidenceLabel = (locale: Locale, value: EvidenceStatus | VerificationState) => evidenceLabels[locale][value];
