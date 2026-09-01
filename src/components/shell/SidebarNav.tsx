import { BookOpen, Boxes, GitBranch, Map, Radio, ShieldCheck } from "lucide-react";
import type { Locale } from "../../data/types";

export type RouteId = "home" | "concepts" | "models" | "evolution" | "signals" | "method";

interface SidebarNavProps {
  locale: Locale;
  currentRoute: RouteId;
  inDialog?: boolean;
}

const items = [
  { id: "home", path: "", icon: Map, en: "Field Map", tr: "Alan Haritası", group: "explore" },
  { id: "concepts", path: "concepts", icon: BookOpen, en: "Concepts", tr: "Kavramlar", group: "explore" },
  { id: "models", path: "models", icon: Boxes, en: "Models", tr: "Modeller", group: "explore" },
  { id: "evolution", path: "evolution", icon: GitBranch, en: "Evolution", tr: "Evrim", group: "explore" },
  { id: "signals", path: "signals", icon: Radio, en: "Signals", tr: "Sinyaller", group: "track" },
  { id: "method", path: "method", icon: ShieldCheck, en: "Method", tr: "Yöntem", group: "track" },
] as const;

export function SidebarNav({ locale, currentRoute, inDialog = false }: SidebarNavProps) {
  return <nav className={inDialog ? "sidebar-nav sidebar-nav--dialog" : "sidebar-nav"} aria-label={locale === "tr" ? "Ana gezinme" : "Primary navigation"}>
    {(["explore", "track"] as const).map((group) => <section className="nav-group" key={group}>
      <h2>{group === "explore" ? (locale === "tr" ? "KEŞFET" : "EXPLORE") : (locale === "tr" ? "TAKİP" : "TRACK")}</h2>
      <ul>
        {items.filter((item) => item.group === group).map((item) => {
          const Icon = item.icon;
          const current = currentRoute === item.id;
          return <li key={item.id}>
            <a href={`/${locale}${item.path ? `/${item.path}` : ""}`} aria-current={current ? "page" : undefined}>
              <Icon aria-hidden="true" />
              <span>{locale === "tr" ? item.tr : item.en}</span>
            </a>
          </li>;
        })}
      </ul>
    </section>)}
  </nav>;
}
