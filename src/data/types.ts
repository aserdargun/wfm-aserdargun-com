export type Locale = "en" | "tr";
export type EntityKind = "concept" | "model" | "milestone" | "signal";
export type EvidenceStatus = "demonstrated" | "reported" | "inferred" | "editorial-synthesis";
export type VerificationState = "current" | "stale" | "needs-review" | "withdrawn";
export type Availability = "public" | "open-weights" | "open-code" | "api" | "limited-preview" | "closed" | "unknown";
export type RelationKind =
  | "precedes"
  | "informs"
  | "predicts"
  | "plans-with"
  | "acts-through"
  | "feeds-back-to"
  | "alternative-to"
  | "contains";

export interface CatalogIssue {
  code:
    | "CLAIM_EVIDENCE_REQUIRED"
    | "LOCALE_PARITY"
    | "DUPLICATE_ID"
    | "ORPHAN_RELATION"
    | "RATIONALE_REQUIRED"
    | "SIGNAL_NOT_APPROVED"
    | "INVALID_DATE"
    | "FALSE_COMPARABILITY"
    | "SCHEMA_INVALID";
  path: string;
  message: string;
}

export interface Measure {
  value: number;
  unit: string;
  denominator?: string;
}

export type CapabilityValue = boolean | "unknown" | Measure;

export interface Source {
  id: string;
  url: string;
  publisher: string;
  sourceType: "paper" | "research-page" | "technical-report" | "repository" | "release-note";
  publicationDate: string;
  lastChecked: string;
  expectedEntityIds: string[];
  language: string;
  accessNotes?: string;
}

export interface Evidence {
  id: string;
  sourceId: string;
  supportedClaimIds: string[];
  evidenceStatus: EvidenceStatus;
  verificationState: VerificationState;
}

export interface Claim {
  id: string;
  subjectId: string;
  field: string;
  evidenceIds: string[];
  evidenceStatus: EvidenceStatus;
  verificationState: VerificationState;
  rationale?: string;
}

export interface Concept {
  id: string;
  order: number;
  family: "foundation" | "perception" | "simulation" | "planning" | "agency" | "embodiment" | "systems";
  featured: boolean;
}

export interface Model {
  id: string;
  organization: string;
  family: "latent-dynamics" | "video-world" | "spatial-world" | "driving-world" | "generalist-world";
  releaseDate: string;
  availability: {
    weights: Availability;
    code: Availability;
    api: Availability;
    paper: Availability;
    product: Availability;
  };
  capabilities: Record<string, CapabilityValue | number>;
}

export interface Milestone {
  id: string;
  date: string;
  entityIds: string[];
  evidenceIds: string[];
}

export interface Signal {
  id: string;
  discoveryDate: string;
  eventDate: string;
  publicationDate: string;
  affectedEntityIds: string[];
  affectedFields: string[];
  evidenceIds: string[];
  approved: boolean;
}

export interface Relation {
  id: string;
  sourceId: string;
  targetId: string;
  kind: RelationKind;
}

export interface LocalizedEntityContent {
  title: string;
  summary: string;
  slug: string;
  description?: string;
  significance?: string;
}

export interface LocalizedClaimContent {
  text: string;
}

export interface LocaleContent {
  entities: Record<string, LocalizedEntityContent>;
  claims: Record<string, LocalizedClaimContent>;
}

export interface Catalog {
  sources: Source[];
  evidence: Evidence[];
  claims: Claim[];
  concepts: Concept[];
  models: Model[];
  milestones: Milestone[];
  signals: Signal[];
  relations: Relation[];
  locales: Record<Locale, LocaleContent>;
}
