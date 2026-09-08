/**
 * Narrows a caller-supplied redirect target to a same-origin path, so a crafted
 * `?redirect=` or `?next=` cannot bounce users off-site.
 *
 * Resolved against a throwaway origin rather than string-matched: browsers
 * normalise backslashes to slashes, so `/\/evil.com` is protocol-relative in
 * practice and a `startsWith("//")` check alone would wave it through.
 */
export function safePath(value: unknown, fallback: string) {
  const raw = String(value ?? "");
  if (!raw.startsWith("/")) return fallback;

  try {
    const url = new URL(raw, "http://x.invalid");
    if (url.origin !== "http://x.invalid") return fallback;
    return `${url.pathname}${url.search}`;
  } catch {
    return fallback;
  }
}
