import { useEffect } from "react";
import { BrowserRouter, Navigate, useLocation } from "react-router-dom";
import { StaticRouter } from "react-router";
import { EvidenceInspector } from "../components/evidence/EvidenceInspector";
import { ResearchConsole } from "../components/shell/ResearchConsole";
import type { RouteId } from "../components/shell/SidebarNav";
import { catalog } from "../data/catalog";
import type { Locale } from "../data/types";
import { ConceptIndexPage } from "../pages/ConceptIndexPage";
import { ConceptPage } from "../pages/ConceptPage";
import { EvolutionPage } from "../pages/EvolutionPage";
import { HomePage } from "../pages/HomePage";
import { MethodPage } from "../pages/MethodPage";
import { ModelIndexPage } from "../pages/ModelIndexPage";
import { ModelPage } from "../pages/ModelPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { SignalsPage } from "../pages/SignalsPage";
import { getLocaleCounterpart, localeFromPath } from "./locale";
import { CATALOG_VERIFIED_ON } from "./format";
import { getRouteManifest } from "./routes";

interface AppProps { routerMode?: "browser" | "static"; url?: string; }
const routeManifest = getRouteManifest();

function RouteView() {
  const location = useLocation();
  const locale = localeFromPath(location.pathname);
  const normalizedPath = location.pathname.replace(/\/+$/, "") || "/";
  const route = routeManifest.find(({ path }) => path === normalizedPath);
  const parts = normalizedPath.split("/").filter(Boolean);
  const section = parts[1] ?? "";
  const slug = parts[2];
  const requestedStage = new URLSearchParams(location.search).get("stage");
  const selectedId = requestedStage && catalog.concepts.some(({ id, featured }) => featured && id === requestedStage) ? requestedStage : "world-model";
  let currentRoute: RouteId = "home";
  let page: React.ReactNode;
  let inspectorId: string | undefined;

  useEffect(() => {
    document.documentElement.lang = locale;
    const notFoundTitle = locale === "tr" ? "WFM - Kayıt bulunamadı" : "WFM - Record not found";
    document.title = route?.title ?? notFoundTitle;
    const meta = (name: string, content: string) => {
      let element = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
      if (!element) { element = document.createElement("meta"); element.name = name; document.head.append(element); }
      element.content = content;
    };
    meta("description", route?.description ?? notFoundTitle);
    document.querySelectorAll('link[rel="canonical"], link[rel="alternate"][hreflang]').forEach((element) => element.remove());
    if (route) {
      document.querySelector('meta[name="robots"]')?.remove();
      for (const language of [locale, locale === "en" ? "tr" : "en"] as const) {
        const link = document.createElement("link");
        link.rel = "alternate"; link.hreflang = language;
        link.href = `https://wfm.aserdargun.com${getLocaleCounterpart(route.path, language)}`;
        document.head.append(link);
      }
      const canonical = document.createElement("link");
      canonical.rel = "canonical"; canonical.href = `https://wfm.aserdargun.com${route.path}`;
      document.head.append(canonical);
    } else meta("robots", "noindex");
  }, [locale, route]);

  if (location.pathname === "/") return <Navigate to={`/en${location.search}${location.hash}`} replace />;

  if (!route) page = <NotFoundPage locale={locale} />;
  else if (!section && parts.length === 1) {
    inspectorId = selectedId;
    page = <HomePage locale={locale} />;
  } else if (section === "concepts" && !slug) {
    currentRoute = "concepts"; page = <ConceptIndexPage locale={locale} />;
  } else if (section === "concepts" && slug) {
    currentRoute = "concepts";
    const id = Object.entries(catalog.locales[locale].entities).find(([, content]) => content.slug === slug)?.[0];
    if (id && catalog.concepts.some((item) => item.id === id)) { inspectorId = id; page = <ConceptPage locale={locale} entityId={id} />; } else page = <NotFoundPage locale={locale} />;
  } else if (section === "models" && !slug) {
    currentRoute = "models"; page = <ModelIndexPage locale={locale} />;
  } else if (section === "models" && slug) {
    currentRoute = "models";
    const id = Object.entries(catalog.locales[locale].entities).find(([, content]) => content.slug === slug)?.[0];
    if (id && catalog.models.some((item) => item.id === id)) { inspectorId = id; page = <ModelPage locale={locale} entityId={id} />; } else page = <NotFoundPage locale={locale} />;
  } else if (section === "evolution") { currentRoute = "evolution"; page = <EvolutionPage locale={locale} />;
  } else if (section === "signals") { currentRoute = "signals"; page = <SignalsPage locale={locale} />;
  } else if (section === "method") { currentRoute = "method"; page = <MethodPage locale={locale} />;
  } else page = <NotFoundPage locale={locale} />;

  return <ResearchConsole locale={locale} currentRoute={currentRoute} currentPath={`${location.pathname}${location.search}${location.hash}`} lastVerified={CATALOG_VERIFIED_ON} evidenceInspector={inspectorId ? <EvidenceInspector locale={locale} entityId={inspectorId} /> : undefined}>{page}</ResearchConsole>;
}

export function App({ routerMode = "browser", url = "/en" }: AppProps) {
  return routerMode === "static"
    ? <StaticRouter location={url}><RouteView /></StaticRouter>
    : <BrowserRouter useTransitions={false}><RouteView /></BrowserRouter>;
}
