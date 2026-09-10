import type { Catalog } from "../../src/data/types";

const fixture: Catalog = {
  sources: [{
    id: "source-example",
    url: "https://example.org/research/world-model",
    publisher: "Example Lab",
    sourceType: "paper",
    publicationDate: "2026-01-15",
    lastChecked: "2026-09-01",
    expectedEntityIds: ["world-model", "model-example"],
    language: "en",
  }],
  evidence: [{
    id: "evidence-example",
    sourceId: "source-example",
    supportedClaimIds: ["claim-example", "claim-concept"],
    evidenceStatus: "demonstrated",
    verificationState: "current",
  }],
  claims: [{ id: "claim-concept", subjectId: "world-model", field: "definition", evidenceIds: ["evidence-example"], evidenceStatus: "demonstrated", verificationState: "current" }, {
    id: "claim-example",
    subjectId: "model-example",
    field: "prediction",
    evidenceIds: ["evidence-example"],
    evidenceStatus: "demonstrated",
    verificationState: "current",
  }],
  concepts: [{ id: "world-model", order: 0, family: "simulation", featured: true }],
  models: [{
    id: "model-example",
    organization: "Example Lab",
    family: "latent-dynamics",
    releaseDate: "2026-01-15",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: "open-code", product: "unknown" },
    capabilities: { actionConditioning: true, videoOutput: "unknown" },
  }],
  milestones: [{ id: "milestone-example", date: "2026-01-15", entityIds: ["model-example"], evidenceIds: ["evidence-example"] }],
  signals: [{
    id: "signal-example",
    discoveryDate: "2026-09-01",
    eventDate: "2026-01-15",
    publicationDate: "2026-01-15",
    affectedEntityIds: ["model-example"],
    affectedFields: ["prediction"],
    evidenceIds: ["evidence-example"],
    approved: true,
  }],
  relations: [{ id: "relation-example", sourceId: "world-model", targetId: "model-example", kind: "contains" }],
  locales: {
    en: {
      entities: {
        "world-model": { title: "World model", summary: "Predicts how an environment may evolve.", slug: "world-model" },
        "model-example": { title: "Example model", summary: "A model used by the validation fixture.", slug: "example-model" },
        "milestone-example": { title: "Example milestone", summary: "A dated validation milestone.", slug: "example-milestone" },
        "signal-example": { title: "Example signal", summary: "An approved validation signal.", slug: "example-signal" },
      },
      claims: { "claim-concept": { text: "World model / Dünya modeli" }, "claim-example": { text: "The model predicts a bounded environment transition." } },
    },
    tr: {
      entities: {
        "world-model": { title: "Dünya modeli", summary: "Bir ortamın nasıl evrilebileceğini tahmin eder.", slug: "dunya-modeli" },
        "model-example": { title: "Örnek model", summary: "Doğrulama örneğinde kullanılan model.", slug: "ornek-model" },
        "milestone-example": { title: "Örnek dönüm noktası", summary: "Tarihli bir doğrulama dönüm noktası.", slug: "ornek-donum-noktasi" },
        "signal-example": { title: "Örnek sinyal", summary: "Onaylanmış bir doğrulama sinyali.", slug: "ornek-sinyal" },
      },
      claims: { "claim-concept": { text: "World model / Dünya modeli" }, "claim-example": { text: "Model, sınırlandırılmış bir ortam geçişini tahmin eder." } },
    },
  },
};

export const makeValidCatalog = (): Catalog => structuredClone(fixture);
