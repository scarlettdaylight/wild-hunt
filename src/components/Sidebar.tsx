"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";

import { localizedPath, ROUTES } from "@/lib/routes";
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
  { href: ROUTES.dashboard, labelKey: "dashboard", Icon: DashboardIcon },
  { href: ROUTES.jobs, labelKey: "jobs", Icon: JobsIcon },
  { href: ROUTES.documents, labelKey: "documents", Icon: DocumentsIcon },
  { href: ROUTES.settings, labelKey: "settings", Icon: SettingsIcon },
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
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
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
            aria-label={t("nav.closeNavigation")}
            className="flex h-8 w-8 shrink-0 items-center justify-center self-end rounded-md text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white md:hidden"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <button
            type="button"
            onClick={toggleCollapsed}
            aria-expanded={!collapsed}
            aria-label={
              collapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")
            }
            title={
              collapsed ? t("nav.expandSidebar") : t("nav.collapseSidebar")
            }
            className={`hidden h-8 w-8 shrink-0 items-center justify-center rounded-md text-off-white/70 transition-colors hover:bg-white/10 hover:text-off-white md:flex ${
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
              {SECTIONS.map(({ href, labelKey, Icon }) => {
                const localizedHref = localizedPath(locale, href);
                const active =
                  pathname === localizedHref ||
                  pathname.startsWith(`${localizedHref}/`);
                const label = t(`nav.${labelKey}`);

                return (
                  <li key={href}>
                    <Link
                      href={localizedHref}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? label : undefined}
                      className={`flex h-10 items-center gap-3 rounded-md px-2 text-sm transition-colors ${
                        collapsed ? "md:justify-center md:px-0" : ""
                      } ${
                        active
                          ? "bg-white/10 font-medium text-off-white"
                          : "text-off-white/70 hover:bg-white/10 hover:text-off-white"
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
