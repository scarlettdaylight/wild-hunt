import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { type EmailOtpType } from "@supabase/supabase-js";

import { createClient } from "@/lib/supabase/server";
import { safePath } from "@/lib/safe-path";

/**
 * Landing point for every emailed auth link — signup confirmation and password
 * recovery alike. Exchanges the one-time token for a session, then forwards to
 * `next`.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const next = searchParams.get("next") ?? "/protected";

  if (!tokenHash || !type) {
    redirect("/auth/error?error=Missing+token+hash+or+type");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.verifyOtp({ type, token_hash: tokenHash });

  if (error) {
    redirect(`/auth/error?error=${encodeURIComponent(error.message)}`);
  }

  redirect(safePath(next, "/protected"));
}
