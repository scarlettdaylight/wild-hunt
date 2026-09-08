import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Protected · Wild Hunt" };

/**
 * Placeholder for the signed-in area. The proxy already redirects anonymous
 * visitors to /auth/login, so anything under here can assume a session.
 */
export default async function ProtectedPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Protected</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Signed in as {user?.email}.
      </p>
    </div>
  );
}
