"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import type { Locale } from "@/i18n/settings";
import { createClient } from "@/lib/supabase/server";
import { safePath } from "@/lib/safe-path";
import { localizedPath, ROUTES } from "@/lib/routes";

export type AuthState = { error?: string; sent?: boolean } | undefined;

function credentials(formData: FormData) {
  return {
    email: String(formData.get("email") ?? ""),
    password: String(formData.get("password") ?? ""),
  };
}

/**
 * Every form that calls into this file carries its locale as a hidden field —
 * Server Actions have no request-scoped access to the `[locale]` route segment
 * the way a Server Component does, so the client has to hand it over explicitly.
 */
function formLocale(formData: FormData): Locale {
  return String(formData.get("locale") ?? "en") as Locale;
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
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword(
    credentials(formData)
  );

  if (error) return { error: error.message };

  // The layout reads the session, so the cached shell has to go too.
  revalidatePath("/", "layout");
  redirect(
    localizedPath(
      formLocale(formData),
      safePath(formData.get("redirect"), ROUTES.dashboard)
    )
  );
}

export async function signUp(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const locale = formLocale(formData);
  const { error } = await supabase.auth.signUp({
    ...credentials(formData),
    options: {
      // Where the confirmation link lands: the confirm route exchanges the
      // token for a session, then forwards to `next`.
      emailRedirectTo: `${await origin()}${localizedPath(
        locale,
        ROUTES.confirm
      )}?next=${ROUTES.dashboard}`,
    },
  });

  if (error) return { error: error.message };

  redirect(localizedPath(locale, ROUTES.checkEmail));
}

export async function signOut(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const locale = formLocale(formData);
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect(localizedPath(locale, ROUTES.home));
}

export async function requestPasswordReset(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();
  const locale = formLocale(formData);
  const { error } = await supabase.auth.resetPasswordForEmail(
    String(formData.get("email") ?? ""),
    {
      redirectTo: `${await origin()}${localizedPath(
        locale,
        ROUTES.confirm
      )}?next=${ROUTES.updatePassword}`,
    }
  );

  if (error) return { error: error.message };

  // Reported the same way whether or not the address exists, so this cannot be
  // used to probe which emails are registered.
  return { sent: true };
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const supabase = await createClient();

  // The recovery link already established a session; updateUser needs it.
  const { error } = await supabase.auth.updateUser({
    password: String(formData.get("password") ?? ""),
  });

  if (error) return { error: error.message };

  revalidatePath("/", "layout");
  redirect(localizedPath(formLocale(formData), ROUTES.dashboard));
}
