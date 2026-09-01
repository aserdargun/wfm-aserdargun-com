import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "../../data/types";
import { getLocaleCounterpart } from "../../app/locale";
import { SidebarNav, type RouteId } from "./SidebarNav";

interface MobileNavProps {
  locale: Locale;
  currentRoute: RouteId;
  currentPath: string;
}

export function MobileNav({ locale, currentRoute, currentPath }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      triggerRef.current?.focus();
    }
  }, [open]);

  const openLabel = locale === "tr" ? "Gezinmeyi aç" : "Open navigation";
  const closeLabel = locale === "tr" ? "Gezinmeyi kapat" : "Close navigation";

  return <>
    <button ref={triggerRef} className="mobile-menu-trigger" type="button" aria-label={openLabel} aria-expanded={open} onClick={() => setOpen(true)}>
      <Menu aria-hidden="true" />
    </button>
    {open ? <div className="mobile-nav" role="dialog" aria-modal="true" aria-label={locale === "tr" ? "Gezinme" : "Navigation"}>
      <div className="mobile-nav__head">
        <span>WORLD MODELS ATLAS</span>
        <button ref={closeRef} type="button" aria-label={closeLabel} onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
      </div>
      <SidebarNav locale={locale} currentRoute={currentRoute} inDialog />
      <a className="mobile-locale-switch" href={getLocaleCounterpart(currentPath, locale === "tr" ? "en" : "tr")} lang={locale === "tr" ? "en" : "tr"}>{locale === "tr" ? "English" : "Türkçe"}</a>
    </div> : null}
  </>;
}
