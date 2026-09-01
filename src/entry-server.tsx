import { renderToString } from "react-dom/server";
import { App } from "./app/App";
import { getRouteManifest } from "./app/routes";
import "./styles/global.css";
import "./styles/components.css";

export { getRouteManifest };

export function renderRoute(url: string) {
  const route = getRouteManifest().find(({ path }) => path === new URL(url, "https://atlas.local").pathname);
  if (!route) throw new Error(`Route is not in the public manifest: ${url}`);
  const appHtml = renderToString(<App routerMode="static" url={url} />);
  if (!/<h1[\s>]/.test(appHtml)) throw new Error(`Route rendered without an H1: ${url}`);
  return { appHtml, ...route };
}
