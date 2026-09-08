"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import { safePath } from "@/lib/safe-path";

export type AuthState = { error?: string; sent?: boolean } | undefined;

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

/**
 * Absolute origin to use in links Supabase puts in emails.
 *
 * Prefers an explicitly configured site URL, because the request host is the
 * per-deployment hostname on Vercel — different on every preview build, and so
 * never matching the redirect allowlist in the Supabase dashboard. Falls back
 * to the request host, which is what you want in local development.
 */
async function origin() {
  const configured =
    process.env.NEXT_PUBLIC_SITE_URL ??
    // Set automatically by Vercel: the project's stable production domain,
    // available in preview deployments too.
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : undefined);

  if (configured) return configured.replace(/\/$/, "");

  const headerList = await headers();
  const host = headerList.get("host");
  const proto = headerList.get("x-forwarded-proto") ?? "http";
  return `${proto}://${host}`;
}

export async function signIn(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(
    credentials(formData),
  );

  if (error) return { error: error.message };

  // The layout reads the session, so the cached shell has to go too.
  revalidatePath("/", "layout");
  redirect(safePath(formData.get("redirect"), "/protected"));
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    ...credentials(formData),
    options: {
      // Where the confirmation link lands. /auth/confirm exchanges the token
      // for a session, then forwards to `next`.
      emailRedirectTo: `${await origin()}/auth/confirm?next=/protected`,
    },
  });

  if (error) return { error: error.message };

  redirect("/auth/check-email");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.resetPasswordForEmail(
    String(formData.get("email") ?? ""),
    {
      redirectTo: `${await origin()}/auth/confirm?next=/auth/update-password`,
    },
  );

  if (error) return { error: error.message };

  // Reported the same way whether or not the address exists, so this cannot be
  // used to probe which emails are registered.
  return { sent: true };
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();

  // The recovery link already established a session; updateUser needs it.
  const { error } = await supabase.auth.updateUser({
    password: String(formData.get("password") ?? ""),
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect("/protected");
}
