import { z } from "zod";

const id = z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const date = z.string().min(10);

const localizedEntitySchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  slug: id,
  description: z.string().min(1).optional(),
  significance: z.string().min(1).optional(),
});

export const catalogSchema = z.object({
  sources: z.array(z.object({
    id,
    url: z.url(),
    publisher: z.string().min(1),
    sourceType: z.enum(["paper", "research-page", "technical-report", "repository", "release-note"]),
    publicationDate: date,
    lastChecked: date,
    expectedEntityIds: z.array(id),
    language: z.string().min(2),
    accessNotes: z.string().optional(),
  })),
  evidence: z.array(z.object({
    id,
    sourceId: id,
    supportedClaimIds: z.array(id),
    evidenceStatus: z.enum(["demonstrated", "reported", "inferred", "editorial-synthesis"]),
    verificationState: z.enum(["current", "stale", "needs-review", "withdrawn"]),
  })),
  claims: z.array(z.object({
    id,
    subjectId: id,
    field: z.string().min(1),
    evidenceIds: z.array(id),
    evidenceStatus: z.enum(["demonstrated", "reported", "inferred", "editorial-synthesis"]),
    verificationState: z.enum(["current", "stale", "needs-review", "withdrawn"]),
    rationale: z.string().min(1).optional(),
  })),
  concepts: z.array(z.object({
    id,
    order: z.number().int().nonnegative(),
    family: z.enum(["foundation", "perception", "simulation", "planning", "agency", "embodiment", "systems"]),
    featured: z.boolean(),
  })),
  models: z.array(z.object({
    id,
    organization: z.string().min(1),
    family: z.enum(["latent-dynamics", "video-world", "spatial-world", "driving-world", "generalist-world"]),
    releaseDate: date,
    availability: z.object({
      weights: z.string(),
      code: z.string(),
      api: z.string(),
      paper: z.string(),
      product: z.string(),
    }),
    capabilities: z.record(z.string(), z.unknown()),
  })),
  milestones: z.array(z.object({
    id,
    date,
    entityIds: z.array(id),
    evidenceIds: z.array(id),
  })),
  signals: z.array(z.object({
    id,
    discoveryDate: date,
    eventDate: date,
    publicationDate: date,
    affectedEntityIds: z.array(id),
    affectedFields: z.array(z.string()),
    evidenceIds: z.array(id),
    approved: z.boolean(),
  })),
  relations: z.array(z.object({ id, sourceId: id, targetId: id, kind: z.string() })),
  locales: z.object({
    en: z.object({
      entities: z.record(z.string(), localizedEntitySchema),
      claims: z.record(z.string(), z.object({ text: z.string().min(1) })),
    }),
    tr: z.object({
      entities: z.record(z.string(), localizedEntitySchema),
      claims: z.record(z.string(), z.object({ text: z.string().min(1) })),
    }),
  }),
});
