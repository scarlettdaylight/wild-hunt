import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard · Wild Hunt" };

/**
 * Placeholder for the signed-in area. Everything in the `(protected)` group sits
 * behind the proxy, which bounces anonymous visitors to the sign-in page, so
 * pages here can assume a session.
 */
export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Signed in as {user?.email}.
      </p>
    </div>
  );
}
