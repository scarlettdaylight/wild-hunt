"use client";

import { useSidebar } from "./SidebarProvider";
import { MenuIcon } from "./icons";

/** Opens the mobile drawer. Hidden once the sidebar becomes a real column. */
export function SidebarTrigger() {
  const { setOpen } = useSidebar();

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      aria-label="Open navigation"
      className="-ml-2 flex h-8 w-8 items-center justify-center rounded-md text-black/60 transition-colors hover:bg-black/5 hover:text-foreground md:hidden dark:text-white/60 dark:hover:bg-white/10"
    >
      <MenuIcon className="h-5 w-5" />
    </button>
  );
}
