import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/app/auth/actions";

export async function SiteHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-black/10 dark:border-white/15">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="font-semibold tracking-tight">
          Wild Hunt
        </Link>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            <Link href="/protected" className="underline-offset-4 hover:underline">
              Protected
            </Link>
            <form action={signOut}>
              <button
                type="submit"
                className="text-black/60 underline-offset-4 hover:underline dark:text-white/60"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link href="/auth/login" className="text-sm underline-offset-4 hover:underline">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
