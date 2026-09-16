import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Dashboard · Wild Hunt" };

/** Overview of the hunt: counts, recent activity, whatever needs attention. */
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
