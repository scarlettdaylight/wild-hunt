/**
 * Shared between the `(protected)` layout, which reads the cookie on the server
 * to pick the first-paint width, and the Sidebar, which writes it on toggle.
 *
 * Its own module because a `"use client"` file's exports become client
 * references — a server component importing this constant from Sidebar.tsx would
 * get a reference object, not the string.
 */
export const SIDEBAR_COOKIE = "sidebar_collapsed";

/** A year, so the choice sticks until the user changes it again. */
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
