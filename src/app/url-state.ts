import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { localeFromPath } from "./locale";

const stageIds = new Set(catalog.concepts.filter(({ featured }) => featured).map(({ id }) => id));
const familyIds = new Set<string>(catalog.models.map(({ family }) => family));
const capabilityIds = new Set(["spatial-3d", "action-conditioning"]);
const modelOrder = new Map(catalog.models.map(({ id }, index) => [id, index]));

export interface AtlasUrlState {
  pathname: string;
  locale: Locale;
  stage?: string;
  family?: string;
  capability?: string;
  compare: string[];
}

export function parseAtlasUrl(url: URL): AtlasUrlState {
  const state: AtlasUrlState = {
    pathname: url.pathname,
    locale: localeFromPath(url.pathname),
    compare: [],
  };
  const stage = url.searchParams.get("stage");
  const family = url.searchParams.get("family");
  const capability = url.searchParams.get("capability");
  if (stage && stageIds.has(stage)) state.stage = stage;
  if (family && familyIds.has(family)) state.family = family;
  if (capability && capabilityIds.has(capability)) state.capability = capability;
  state.compare = [...new Set((url.searchParams.get("compare") ?? "").split(",").filter((id) => modelOrder.has(id)))]
    .sort((a, b) => modelOrder.get(a)! - modelOrder.get(b)!).slice(0, 4);
  return state;
}

export function serializeAtlasUrl(state: AtlasUrlState): string {
  const params = new URLSearchParams();
  if (state.stage) params.set("stage", state.stage);
  if (state.family) params.set("family", state.family);
  if (state.capability) params.set("capability", state.capability);
  if (state.compare.length) params.set("compare", state.compare.join(","));
  const query = params.toString();
  return `${state.pathname}${query ? `?${query}` : ""}`;
}
