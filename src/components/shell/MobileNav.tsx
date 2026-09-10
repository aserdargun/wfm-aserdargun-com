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
  const dialogRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      closeRef.current?.focus();
    } else if (wasOpen.current) {
      queueMicrotask(() => triggerRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!open || !dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const siblings = [...(dialog.parentElement?.children ?? [])].filter((node): node is HTMLElement => node instanceof HTMLElement && node !== dialog);
    const previousInert = siblings.map((node) => node.inert);
    siblings.forEach((node) => { node.inert = true; });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); setOpen(false); }
      if (event.key !== "Tab") return;
      const controls = [...dialog.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')];
      const first = controls[0];
      const last = controls.at(-1);
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      siblings.forEach((node, index) => { node.inert = previousInert[index]!; });
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const openLabel = locale === "tr" ? "Gezinmeyi aç" : "Open navigation";
  const closeLabel = locale === "tr" ? "Gezinmeyi kapat" : "Close navigation";

  return <>
    <button ref={triggerRef} className="mobile-menu-trigger" type="button" aria-label={openLabel} aria-expanded={open} onClick={() => setOpen(true)}>
      <Menu aria-hidden="true" />
    </button>
    {open ? <div ref={dialogRef} className="mobile-nav" role="dialog" aria-modal="true" aria-label={locale === "tr" ? "Gezinme" : "Navigation"}>
      <div className="mobile-nav__head">
        <span>WORLD MODELS ATLAS</span>
        <button ref={closeRef} type="button" aria-label={closeLabel} onClick={() => setOpen(false)}><X aria-hidden="true" /></button>
      </div>
      <SidebarNav locale={locale} currentRoute={currentRoute} inDialog />
      <a className="mobile-locale-switch" href={getLocaleCounterpart(currentPath, locale === "tr" ? "en" : "tr")} lang={locale === "tr" ? "en" : "tr"}>{locale === "tr" ? "English" : "Türkçe"}</a>
    </div> : null}
  </>;
}
