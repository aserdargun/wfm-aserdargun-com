import type { Signal } from "../types";

export const signals: Signal[] = [
  { id: "signal-atlas-launch", discoveryDate: "2026-09-01", eventDate: "2026-09-01", publicationDate: "2026-09-01", affectedEntityIds: ["atlas"], affectedFields: ["spatial-generation", "video-output"], evidenceIds: ["evidence-worldlabs-atlas"], approved: true },
  { id: "signal-cosmos-3-release", discoveryDate: "2026-06-03", eventDate: "2026-06-02", publicationDate: "2026-06-02", affectedEntityIds: ["cosmos-3"], affectedFields: ["availability", "physical-reasoning"], evidenceIds: ["evidence-nvidia-cosmos3"], approved: true },
  { id: "signal-oasis-3-release", discoveryDate: "2026-09-04", eventDate: "2026-06-10", publicationDate: "2026-06-10", affectedEntityIds: ["oasis-3"], affectedFields: ["driving-simulation", "multi-view", "api"], evidenceIds: ["evidence-decart-oasis3"], approved: true },
  { id: "signal-waymo-world-model", discoveryDate: "2026-02-06", eventDate: "2026-02-06", publicationDate: "2026-02-06", affectedEntityIds: ["waymo-world-model"], affectedFields: ["driving-simulation"], evidenceIds: ["evidence-waymo-world-model"], approved: true },
  { id: "signal-gwm-1-release", discoveryDate: "2025-12-11", eventDate: "2025-12-11", publicationDate: "2025-12-11", affectedEntityIds: ["gwm-1"], affectedFields: ["action-conditioning", "robotics"], evidenceIds: ["evidence-runway-gwm1"], approved: true },
  { id: "signal-cosmos-1-release", discoveryDate: "2025-01-07", eventDate: "2025-01-06", publicationDate: "2025-01-06", affectedEntityIds: ["cosmos-1"], affectedFields: ["multimodal-generation", "physical-reasoning"], evidenceIds: ["evidence-nvidia-cosmos1"], approved: true },
  { id: "signal-v-jepa-1-release", discoveryDate: "2024-02-15", eventDate: "2024-02-15", publicationDate: "2024-02-15", affectedEntityIds: ["v-jepa-1"], affectedFields: ["latent-prediction", "self-supervised-pretraining"], evidenceIds: ["evidence-meta-vjepa1"], approved: true },
  { id: "signal-oasis-launch", discoveryDate: "2024-10-31", eventDate: "2024-10-31", publicationDate: "2024-10-31", affectedEntityIds: ["oasis"], affectedFields: ["interactive-video", "real-time-inference"], evidenceIds: ["evidence-decart-oasis"], approved: true },
  { id: "signal-gaia-1-paper", discoveryDate: "2023-09-30", eventDate: "2023-09-29", publicationDate: "2023-09-29", affectedEntityIds: ["gaia-1"], affectedFields: ["driving-simulation", "video-output"], evidenceIds: ["evidence-wayve-gaia1"], approved: true },
];
