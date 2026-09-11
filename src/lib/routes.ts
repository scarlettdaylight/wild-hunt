/**
 * Every URL the app links to, in one place.
 *
 * Route groups — `(public)`, `(protected)`, `(auth)` — organise `src/app` without
 * appearing in the URL, so the folder a page lives in no longer tells you its
 * path. This map is the source of truth instead, and it is what keeps the
 * proxy's public-route list from drifting away from the pages that exist.
 */
export const ROUTES = {
  home: "/",
  login: "/login",
  signUp: "/sign-up",
  checkEmail: "/check-email",
  forgotPassword: "/forgot-password",
  updatePassword: "/update-password",
  /** Where a failed token exchange lands, with the message in `?error=`. */
  authError: "/error",
  /** Landing point for emailed auth links; exchanges the token for a session. */
  confirm: "/account/confirm",
  dashboard: "/dashboard",
} as const;

/**
 * Paths served without a session — the `(public)` group. Anything else is
 * behind the proxy's redirect to the sign-in page.
 *
 * `updatePassword` is here because the recovery link signs the user in on its
 * way through `confirm`; the page is useless without that session anyway.
 */
export const PUBLIC_ROUTES = [
  ROUTES.home,
  ROUTES.login,
  ROUTES.signUp,
  ROUTES.checkEmail,
  ROUTES.forgotPassword,
  ROUTES.updatePassword,
  ROUTES.authError,
  ROUTES.confirm,
] as const;
