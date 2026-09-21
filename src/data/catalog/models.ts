import type { Model } from "../types";

const paperOpen = "public" as const;

export const models: Model[] = [
  {
    id: "dreamer-v3", organization: "Google DeepMind", family: "latent-dynamics", releaseDate: "2023-01-10",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { latentDynamics: true, actionConditioning: true, embodiedControl: true, videoOutput: "unknown" },
  },
  {
    id: "v-jepa-2", organization: "Meta AI", family: "latent-dynamics", releaseDate: "2025-06-11",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { latentPrediction: true, actionConditioning: true, robotPlanning: true, trainingVideoHoursLowerBound: { value: 1_000_000, unit: "hours" } },
  },
  {
    id: "genie-3", organization: "Google DeepMind", family: "video-world", releaseDate: "2025-08-05",
    availability: { weights: "closed", code: "closed", api: "limited-preview", paper: "unknown", product: "limited-preview" },
    capabilities: { interactiveWorld: true, videoOutput: true, actionConditioning: true, framesPerSecond: { value: 24, unit: "fps" }, maxResolution: { value: 720, unit: "p" } },
  },
  {
    id: "cosmos-3", organization: "NVIDIA", family: "generalist-world", releaseDate: "2026-06-02",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { multimodal: true, actionConditioning: true, physicalReasoning: true, videoOutput: true },
  },
  {
    id: "atlas", organization: "World Labs", family: "spatial-world", releaseDate: "2026-09-01",
    availability: { weights: "closed", code: "closed", api: "limited-preview", paper: "unknown", product: "limited-preview" },
    capabilities: { spatialGeneration: true, videoOutput: true, cameraControl: true, pointCloudOutput: true, gaussianSplatOutput: true, exampleVideoDuration: { value: 60, unit: "seconds" }, exampleVideoResolution: { value: 1440, unit: "p" } },
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
  {
    id: "v-jepa-1", organization: "Meta FAIR", family: "latent-dynamics", releaseDate: "2024-02-15",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { latentPrediction: true, selfSupervisedPretraining: true, videoOutput: false },
  },
  {
    id: "cosmos-1", organization: "NVIDIA", family: "generalist-world", releaseDate: "2025-01-06",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { multimodal: true, videoOutput: true, physicalReasoning: true, actionConditioning: true },
  },
  {
    id: "gaia-1", organization: "Wayve", family: "driving-world", releaseDate: "2023-09-29",
    availability: { weights: "closed", code: "closed", api: "closed", paper: paperOpen, product: "closed" },
    capabilities: { drivingSimulation: true, videoOutput: true, multiView: "unknown", actionConditioning: true },
  },
  {
    id: "oasis", organization: "Decart & Etched", family: "video-world", releaseDate: "2024-10-31",
    availability: { weights: "open-weights", code: "open-code", api: "unknown", paper: paperOpen, product: "unknown" },
    capabilities: { interactiveWorld: true, videoOutput: true, actionConditioning: true, realTimeInference: true, framesPerSecond: { value: 20, unit: "fps" }, openWeights: true },
  },
  {
    id: "oasis-3", organization: "Decart", family: "driving-world", releaseDate: null,
    availability: { weights: "closed", code: "closed", api: "api", paper: "unknown", product: "api" },
    capabilities: { interactiveWorld: true, realTimeInference: true, drivingSimulation: true, actionConditioning: true, multiView: true },
  },
];
