import Link from "next/link";

import { createClient } from "@/lib/supabase/server";
import { signOut } from "@/lib/auth/actions";
import { ROUTES } from "@/lib/routes";

export async function SiteHeader({ leading }: { leading?: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="border-b border-hairline bg-off-white">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {/* The (protected) layout passes the drawer trigger in here. */}
          {leading}
          <Link href={ROUTES.home} className="font-semibold tracking-tight">
            Wild Hunt
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-4 text-sm">
            {/* Section links live in SectionNav, inside the (protected) group. */}
            <form action={signOut}>
              <button
                type="submit"
                className="text-muted underline-offset-4 hover:underline"
              >
                Sign out
              </button>
            </form>
          </div>
        ) : (
          <Link href={ROUTES.login} className="text-sm underline-offset-4 hover:underline">
            Sign in
          </Link>
        )}
      </nav>
    </header>
  );
}
