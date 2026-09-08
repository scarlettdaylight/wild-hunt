/**
 * Supabase connection settings.
 *
 * Read at call time rather than module load so the app still builds in CI
 * without credentials — a missing variable fails on the first request, with a
 * message that says what to do, instead of a bare 401.
 *
 * Both values are public by design: the publishable key only grants what Row
 * Level Security allows. Never put the secret (service-role) key in a
 * NEXT_PUBLIC_ variable.
 */
function required(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(
      `Missing ${name}. Copy .env.example to .env.local and fill it in from your Supabase project settings.`,
    );
  }
  return value;
}

export function supabaseUrl() {
  return required(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
}

export function supabasePublishableKey() {
  return required(
    "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
  );
}
