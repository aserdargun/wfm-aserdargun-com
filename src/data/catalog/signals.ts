import type { Signal } from "../types";

export const signals: Signal[] = [
  { id: "signal-atlas-launch", discoveryDate: "2026-09-01", eventDate: "2026-09-01", publicationDate: "2026-09-01", affectedEntityIds: ["atlas"], affectedFields: ["spatial-generation", "video-output"], evidenceIds: ["evidence-worldlabs-atlas"], approved: true },
  { id: "signal-cosmos-3-release", discoveryDate: "2026-06-03", eventDate: "2026-06-02", publicationDate: "2026-06-02", affectedEntityIds: ["cosmos-3"], affectedFields: ["availability", "physical-reasoning"], evidenceIds: ["evidence-nvidia-cosmos3"], approved: true },
  { id: "signal-waymo-world-model", discoveryDate: "2026-02-06", eventDate: "2026-02-06", publicationDate: "2026-02-06", affectedEntityIds: ["waymo-world-model"], affectedFields: ["driving-simulation"], evidenceIds: ["evidence-waymo-world-model"], approved: true },
  { id: "signal-gwm-1-release", discoveryDate: "2025-12-11", eventDate: "2025-12-11", publicationDate: "2025-12-11", affectedEntityIds: ["gwm-1"], affectedFields: ["action-conditioning", "robotics"], evidenceIds: ["evidence-runway-gwm1"], approved: true },
];
