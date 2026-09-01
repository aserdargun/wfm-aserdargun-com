import { claims, evidence } from "./catalog/claims";
import { concepts, relations } from "./catalog/concepts";
import { models } from "./catalog/models";
import { signals } from "./catalog/signals";
import { sources } from "./catalog/sources";
import { milestones } from "./catalog/timeline";
import { en } from "./locales/en";
import { tr } from "./locales/tr";
import type { Catalog } from "./types";

export const catalog: Catalog = {
  sources,
  evidence,
  claims,
  concepts,
  models,
  milestones,
  signals,
  relations,
  locales: { en, tr },
};
