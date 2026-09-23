import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { safePath } from "@/lib/safe-path";
import { localizedPath, ROUTES } from "@/lib/routes";

/**
 * Landing point for every emailed auth link — signup confirmation and password
 * recovery alike. Exchanges the one-time token for a session, then forwards to
 * `next`.
 *
 * Reads the locale straight off the route's own params: this is a Route
 * Handler, so there's no client form to hand it over as a hidden field.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? ROUTES.dashboard;

  if (!tokenHash || !type) {
    redirect(
      `${localizedPath(locale, ROUTES.authError)}?error=Missing+token+hash+or+type`,
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({
    type,
    token_hash: tokenHash,
  });

  if (error) {
    redirect(
      `${localizedPath(locale, ROUTES.authError)}?error=${encodeURIComponent(error.message)}`,
    );
  }

  redirect(localizedPath(locale, safePath(next, ROUTES.dashboard)));
}
