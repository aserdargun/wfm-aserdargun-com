import type { Concept, Relation } from "../types";

export const concepts: Concept[] = [
  { id: "llm", order: 1, family: "foundation", featured: true },
  { id: "vlm", order: 2, family: "perception", featured: true },
  { id: "world-model", order: 3, family: "simulation", featured: true },
  { id: "planner", order: 4, family: "planning", featured: true },
  { id: "agent", order: 5, family: "agency", featured: true },
  { id: "physical-ai", order: 6, family: "embodiment", featured: true },
  { id: "digital-twin", order: 7, family: "systems", featured: true },
  { id: "latent-state", order: 8, family: "simulation", featured: false },
  { id: "action-conditioning", order: 9, family: "planning", featured: false },
  { id: "uncertainty", order: 10, family: "simulation", featured: false },
  { id: "sim-to-real", order: 11, family: "embodiment", featured: false },
  { id: "interactive-control", order: 12, family: "simulation", featured: false },
  { id: "self-supervised-pretraining", order: 13, family: "foundation", featured: false },
];

export const relations: Relation[] = [
  { id: "relation-llm-vlm", sourceId: "llm", targetId: "vlm", kind: "informs" },
  { id: "relation-vlm-world-model", sourceId: "vlm", targetId: "world-model", kind: "informs" },
  { id: "relation-world-model-planner", sourceId: "world-model", targetId: "planner", kind: "predicts" },
  { id: "relation-planner-agent", sourceId: "planner", targetId: "agent", kind: "plans-with" },
  { id: "relation-agent-physical-ai", sourceId: "agent", targetId: "physical-ai", kind: "acts-through" },
  { id: "relation-physical-ai-digital-twin", sourceId: "physical-ai", targetId: "digital-twin", kind: "feeds-back-to" },
  { id: "relation-digital-twin-world-model", sourceId: "digital-twin", targetId: "world-model", kind: "feeds-back-to" },
  { id: "relation-latent-world-model", sourceId: "world-model", targetId: "latent-state", kind: "contains" },
  { id: "relation-action-planner", sourceId: "action-conditioning", targetId: "planner", kind: "informs" },
  { id: "relation-uncertainty-world-model", sourceId: "uncertainty", targetId: "world-model", kind: "informs" },
  { id: "relation-sim-real-physical", sourceId: "sim-to-real", targetId: "physical-ai", kind: "informs" },
  { id: "relation-interactive-world-model", sourceId: "interactive-control", targetId: "world-model", kind: "informs" },
  { id: "relation-sslp-world-model", sourceId: "self-supervised-pretraining", targetId: "world-model", kind: "informs" },
  { id: "relation-sslp-foundation", sourceId: "self-supervised-pretraining", targetId: "llm", kind: "precedes" },
];
