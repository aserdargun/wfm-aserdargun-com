import type { Model } from "./types";

export function matchesCapability(model: Model, capability: string | null): boolean {
  if (capability === "action-conditioning") return model.capabilities.actionConditioning === true;
  if (capability === "spatial-3d") {
    return ["spatialGeneration", "pointCloudOutput", "multiView"].some((key) => model.capabilities[key] === true);
  }
  return true;
}
