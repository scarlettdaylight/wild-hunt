"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ROUTES } from "@/lib/routes";
import { useSidebar } from "./SidebarProvider";
import {
  ChevronLeftIcon,
  CloseIcon,
  DashboardIcon,
  DocumentsIcon,
  JobsIcon,
  SettingsIcon,
} from "./icons";

/**
 * Sections of the signed-in area, in the order the sidebar lists them. Kept here
 * rather than in `routes.ts` so that module stays plain data — the proxy imports
 * it on the edge runtime and has no business pulling in React components.
 */
const SECTIONS = [
  { href: ROUTES.dashboard, label: "Dashboard", Icon: DashboardIcon },
  { href: ROUTES.jobs, label: "Jobs", Icon: JobsIcon },
  { href: ROUTES.documents, label: "Documents", Icon: DocumentsIcon },
  { href: ROUTES.settings, label: "Settings", Icon: SettingsIcon },
] as const;

/**
 * A column on desktop, an overlay drawer below `md`.
 *
 * `collapsed` only applies from `md` up; on mobile the drawer is full width or
 * absent, so a rail would be a third state nobody asked for. The closed drawer
 * is `invisible` rather than merely shifted off-screen, which keeps its links
 * out of the tab order; visibility is transitioned so the slide-out still shows.
 */
export function Sidebar() {
  const { collapsed, toggleCollapsed, open, setOpen } = useSidebar();
  const pathname = usePathname();

  return (
    <>
      <div
        onClick={() => setOpen(false)}
        aria-hidden
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-200 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 shrink-0 border-r border-black/10 bg-primary transition-[transform,visibility] duration-200 md:visible md:static md:z-auto md:translate-x-0 md:transition-[width] dark:border-white/15 ${
          open ? "visible translate-x-0" : "invisible -translate-x-full"
        } ${collapsed ? "md:w-16" : "md:w-64"}`}
      >
        <div className="sticky top-0 flex flex-col gap-2 p-4">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close navigation"
            className="flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-md text-black/60 transition-colors hover:bg-black/5 hover:text-foreground md:hidden dark:text-white/60 dark:hover:bg-white/10"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!collapsed}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-md text-black/60 transition-colors hover:bg-black/5 hover:text-foreground md:flex dark:text-white/60 dark:hover:bg-white/10 ${
              collapsed ? "md:self-center" : "md:self-end"
            }`}
          >
            <ChevronLeftIcon
              className={`h-4 w-4 transition-transform duration-200 ${
                collapsed ? "rotate-180" : ""
              }`}
            />
          </button>

          <nav>
            <ul className="flex flex-col gap-1">
              {SECTIONS.map(({ href, label, Icon }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);

                return (
                  <li key={href}>
                    <Link
                      href={href}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? label : undefined}
                      className={`flex h-10 items-center gap-3 rounded-md px-2 text-sm transition-colors ${
                        collapsed ? "md:justify-center md:px-0" : ""
                      } ${
                        active
                          ? "bg-black/5 font-medium text-foreground dark:bg-white/10"
                          : "text-black/60 hover:bg-black/5 hover:text-foreground dark:text-white/60 dark:hover:bg-white/10"
                      }`}
                    >
                      <Icon className="h-5 w-5 shrink-0" />
                      <span className={collapsed ? "md:sr-only" : "truncate"}>
                        {label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </aside>
    </>
  );
}
