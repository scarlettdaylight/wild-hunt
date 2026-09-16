"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { SIDEBAR_COOKIE, SIDEBAR_COOKIE_MAX_AGE } from "@/lib/sidebar";

type SidebarState = {
  /** Desktop: rail or full width. Persisted, so it survives a reload. */
  collapsed: boolean;
  toggleCollapsed: () => void;
  /** Mobile: whether the drawer is showing. Deliberately not persisted. */
  open: boolean;
  setOpen: (open: boolean) => void;
};

const SidebarContext = createContext<SidebarState | null>(null);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used inside a SidebarProvider");
  }
  return context;
}

/**
 * Holds the sidebar's two independent states, because the trigger lives in the
 * header and the drawer itself is a sibling of it.
 */
export function SidebarProvider({
  defaultCollapsed,
  children,
}: {
  defaultCollapsed: boolean;
  children: React.ReactNode;
}) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // The drawer covers the content, so leaving it open across a navigation would
  // hide the very page the user just asked for. Adjusted during render rather
  // than in an effect — that avoids a second render pass, and unlike closing it
  // from the link's onClick it also catches back/forward navigation.
  const [lastPathname, setLastPathname] = useState(pathname);
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    // Scrolling the page behind an open drawer reads as the drawer being broken.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const toggleCollapsed = () => {
    const next = !collapsed;
    setCollapsed(next);
    // Written here rather than through a server action: the layout reads it on
    // the next request purely to render the right width on first paint.
    document.cookie = `${SIDEBAR_COOKIE}=${next ? "1" : "0"}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}; samesite=lax`;
  };

  return (
    <SidebarContext value={{ collapsed, toggleCollapsed, open, setOpen }}>
      {children}
    </SidebarContext>
  );
}
