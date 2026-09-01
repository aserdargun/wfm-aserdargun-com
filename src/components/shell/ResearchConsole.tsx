import type { ReactNode } from "react";
import type { Locale } from "../../data/types";
import { MobileNav } from "./MobileNav";
import { SidebarNav, type RouteId } from "./SidebarNav";
import { TopUtilityBar } from "./TopUtilityBar";

interface ResearchConsoleProps {
  locale: Locale;
  currentRoute: RouteId;
  currentPath: string;
  lastVerified: string;
  evidenceInspector?: ReactNode;
  children: ReactNode;
}

export function ResearchConsole({ locale, currentRoute, currentPath, lastVerified, evidenceInspector, children }: ResearchConsoleProps) {
  return <div className={`research-console${evidenceInspector ? " research-console--with-inspector" : ""}`}>
    <a className="skip-link" href="#main-content">{locale === "tr" ? "Ana içeriğe geç" : "Skip to main content"}</a>
    <TopUtilityBar locale={locale} currentPath={currentPath} lastVerified={lastVerified} />
    <MobileNav locale={locale} currentRoute={currentRoute} currentPath={currentPath} />
    <aside className="desktop-rail"><SidebarNav locale={locale} currentRoute={currentRoute} /></aside>
    <main id="main-content" tabIndex={-1}>{children}</main>
    {evidenceInspector ? <div className="inspector-column">{evidenceInspector}</div> : null}
  </div>;
}
