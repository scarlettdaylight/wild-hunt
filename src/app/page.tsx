import Link from "next/link";

import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="text-4xl font-semibold tracking-tight">Wild Hunt</h1>
      <p className="mt-4 max-w-prose text-muted">
        Next.js and Supabase starter — auth, session handling and a GraphQL
        client, ready to build on.
      </p>

      <Link
        href={user ? "/protected" : "/auth/sign-up"}
        className="mt-8 inline-block rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-off-white transition-opacity hover:opacity-90"
      >
        {user ? "Go to app" : "Get started"}
      </Link>
    </div>
  );
}
