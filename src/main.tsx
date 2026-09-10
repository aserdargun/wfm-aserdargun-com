import "@fontsource-variable/inter";
import "@fontsource/ibm-plex-mono/400.css";
import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./app/App";
import "./styles/global.css";
import "./styles/components.css";

const root = document.getElementById("root");
if (!root) throw new Error("Missing #root element");
const app = <StrictMode><App /></StrictMode>;
// Query-driven selections are not present in the static route snapshot.
const hasInteractiveQuery = ["stage", "capability", "compare", "family"].some((key) => new URLSearchParams(location.search).has(key));
if (root.hasChildNodes() && !hasInteractiveQuery) hydrateRoot(root, app);
else createRoot(root).render(app);
