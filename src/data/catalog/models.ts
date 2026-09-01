import type { Model } from "../types";

const paperOpen = "open-code" as const;

export const models: Model[] = [
  {
    id: "dreamer-v3", organization: "Google DeepMind", family: "latent-dynamics", releaseDate: "2023-01-10",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { latentDynamics: true, actionConditioning: true, embodiedControl: true, videoOutput: "unknown" },
  },
  {
    id: "v-jepa-2", organization: "Meta AI", family: "latent-dynamics", releaseDate: "2025-06-11",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { latentPrediction: true, actionConditioning: true, robotPlanning: true, trainingVideoHours: { value: 1_000_000, unit: "hours" } },
  },
  {
    id: "genie-3", organization: "Google DeepMind", family: "video-world", releaseDate: "2025-08-05",
    availability: { weights: "closed", code: "closed", api: "limited-preview", paper: "unknown", product: "limited-preview" },
    capabilities: { interactiveWorld: true, actionConditioning: true, framesPerSecond: { value: 24, unit: "fps" }, maxResolution: { value: 720, unit: "p" } },
  },
  {
    id: "cosmos-3", organization: "NVIDIA", family: "generalist-world", releaseDate: "2026-06-02",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { multimodal: true, actionConditioning: true, physicalReasoning: true, videoOutput: true },
  },
  {
    id: "atlas", organization: "World Labs", family: "spatial-world", releaseDate: "2026-09-01",
    availability: { weights: "closed", code: "closed", api: "limited-preview", paper: "unknown", product: "limited-preview" },
    capabilities: { spatialGeneration: true, cameraControl: true, pointCloudOutput: true, gaussianSplatOutput: true, maxVideoDuration: { value: 60, unit: "seconds" }, maxResolution: { value: 1440, unit: "p" } },
  },
  {
    id: "gwm-1", organization: "Runway", family: "generalist-world", releaseDate: "2025-12-11",
    availability: { weights: "closed", code: "closed", api: "limited-preview", paper: "unknown", product: "limited-preview" },
    capabilities: { interactiveWorld: true, actionConditioning: true, videoOutput: true, robotics: true },
  },
  {
    id: "waymo-world-model", organization: "Waymo", family: "driving-world", releaseDate: "2026-02-06",
    availability: { weights: "closed", code: "closed", api: "closed", paper: "unknown", product: "closed" },
    capabilities: { drivingSimulation: true, actionConditioning: true, multiSensor: true, counterfactuals: true },
  },
  {
    id: "gaia-3", organization: "Wayve", family: "driving-world", releaseDate: "2025-12-02",
    availability: { weights: "closed", code: "closed", api: "closed", paper: "unknown", product: "closed" },
    capabilities: { drivingSimulation: true, actionConditioning: true, multiView: true, videoOutput: true },
  },
];
