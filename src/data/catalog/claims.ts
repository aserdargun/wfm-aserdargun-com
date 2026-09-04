import type { Claim, Evidence } from "../types";

export const claims: Claim[] = [
  { id: "claim-world-model-definition", subjectId: "world-model", field: "definition", evidenceIds: ["evidence-world-models-2018"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "claim-dreamerv3-domains", subjectId: "dreamer-v3", field: "reinforcement-learning", evidenceIds: ["evidence-dreamer-v3"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "claim-vjepa2-action-conditioned-planning", subjectId: "v-jepa-2", field: "planning", evidenceIds: ["evidence-meta-vjepa2"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "claim-genie3-realtime-worlds", subjectId: "genie-3", field: "interactive-video", evidenceIds: ["evidence-deepmind-genie3"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-cosmos3-open-development", subjectId: "cosmos-3", field: "availability", evidenceIds: ["evidence-nvidia-cosmos3"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "claim-atlas-1440p-minute-video", subjectId: "atlas", field: "video-output", evidenceIds: ["evidence-worldlabs-atlas"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-gwm1-simulates-actions", subjectId: "gwm-1", field: "action-conditioning", evidenceIds: ["evidence-runway-gwm1"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-waymo-driving-simulation", subjectId: "waymo-world-model", field: "driving-simulation", evidenceIds: ["evidence-waymo-world-model"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-gaia3-multiview-driving", subjectId: "gaia-3", field: "driving-simulation", evidenceIds: ["evidence-wayve-gaia3"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-vjepa1-latent-prediction", subjectId: "v-jepa-1", field: "latent-prediction", evidenceIds: ["evidence-meta-vjepa1"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "claim-cosmos1-multimodal-generation", subjectId: "cosmos-1", field: "multimodal-generation", evidenceIds: ["evidence-nvidia-cosmos1"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-gaia1-generative-driving", subjectId: "gaia-1", field: "driving-simulation", evidenceIds: ["evidence-wayve-gaia1"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "claim-oasis-realtime-interactive", subjectId: "oasis", field: "interactive-video", evidenceIds: ["evidence-decart-oasis"], evidenceStatus: "reported", verificationState: "current" },
  { id: "claim-oasis3-physical-ai", subjectId: "oasis-3", field: "driving-simulation", evidenceIds: ["evidence-decart-oasis3"], evidenceStatus: "reported", verificationState: "current" },
];

export const evidence: Evidence[] = [
  { id: "evidence-world-models-2018", sourceId: "source-world-models-2018", supportedClaimIds: ["claim-world-model-definition"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "evidence-dreamer-v3", sourceId: "source-dreamer-v3", supportedClaimIds: ["claim-dreamerv3-domains"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "evidence-meta-vjepa2", sourceId: "source-meta-vjepa2", supportedClaimIds: ["claim-vjepa2-action-conditioned-planning"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "evidence-deepmind-genie3", sourceId: "source-deepmind-genie3", supportedClaimIds: ["claim-genie3-realtime-worlds"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-nvidia-cosmos3", sourceId: "source-nvidia-cosmos3", supportedClaimIds: ["claim-cosmos3-open-development"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "evidence-worldlabs-atlas", sourceId: "source-worldlabs-atlas", supportedClaimIds: ["claim-atlas-1440p-minute-video"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-runway-gwm1", sourceId: "source-runway-gwm1", supportedClaimIds: ["claim-gwm1-simulates-actions"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-waymo-world-model", sourceId: "source-waymo-world-model", supportedClaimIds: ["claim-waymo-driving-simulation"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-wayve-gaia3", sourceId: "source-wayve-gaia3", supportedClaimIds: ["claim-gaia3-multiview-driving"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-meta-vjepa1", sourceId: "source-meta-vjepa1", supportedClaimIds: ["claim-vjepa1-latent-prediction"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "evidence-nvidia-cosmos1", sourceId: "source-nvidia-cosmos1", supportedClaimIds: ["claim-cosmos1-multimodal-generation"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-wayve-gaia1", sourceId: "source-wayve-gaia1", supportedClaimIds: ["claim-gaia1-generative-driving"], evidenceStatus: "demonstrated", verificationState: "current" },
  { id: "evidence-decart-oasis", sourceId: "source-decart-oasis", supportedClaimIds: ["claim-oasis-realtime-interactive"], evidenceStatus: "reported", verificationState: "current" },
  { id: "evidence-decart-oasis3", sourceId: "source-decart-oasis3", supportedClaimIds: ["claim-oasis3-physical-ai"], evidenceStatus: "reported", verificationState: "current" },
];
