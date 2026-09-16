import { cookies } from "next/headers";

import { SiteHeader } from "@/components/SiteHeader";
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/SidebarProvider";
import { SidebarTrigger } from "@/components/SidebarTrigger";
import { SIDEBAR_COOKIE } from "@/lib/sidebar";

/**
 * Shell for the signed-in area. Everything in the `(protected)` group sits
 * behind the proxy, which bounces anonymous visitors to the sign-in page, so
 * pages here can assume a session.
 *
 * The sidebar is a sibling of the header rather than nested under it, so it runs
 * the full height of the window. Its collapsed state is read from a cookie here
 * instead of being restored on the client, so the first paint is already the
 * right width.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const collapsed = (await cookies()).get(SIDEBAR_COOKIE)?.value === "1";

  return (
    <SidebarProvider defaultCollapsed={collapsed}>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <SiteHeader leading={<SidebarTrigger />} />
          <main className="flex flex-1 flex-col">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
