import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

import { PUBLIC_ROUTES, ROUTES } from "@/lib/routes";
import { supabasePublishableKey, supabaseUrl } from "./env";

/**
 * Every route is nested under `app/[locale]`, so the first segment of any
 * pathname reaching this point is always a locale — the proxy redirects
 * anything else before this runs. Strips it so the rest of this file can
 * compare against `ROUTES`, which stores locale-less paths.
 */
function splitLocale(pathname: string) {
  const [, locale, ...rest] = pathname.split("/");
  return { locale, pathname: `/${rest.join("/")}` };
}

/**
 * Route groups are invisible to the runtime, so the `(public)` / `(protected)`
 * split in `src/app` cannot be read off the request. `PUBLIC_ROUTES` mirrors it.
 */
function isPublic(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

/**
 * Refreshes the Supabase auth token and gates protected routes.
 *
 * The response object must be the one returned to the browser — recreating it
 * after `getClaims()` would drop the refreshed cookies and log the user out.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl(), supabasePublishableKey(), {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        for (const { name, value } of cookiesToSet) {
          request.cookies.set(name, value);
        }
        response = NextResponse.next({ request });
        for (const { name, value, options } of cookiesToSet) {
          response.cookies.set(name, value, options);
        }
      },
    },
  });

  // Do not run other code between creating the client and this call: it is what
  // refreshes an expired token, and a slow await here can log users out at random.
  const { data } = await supabase.auth.getClaims();

  const { locale, pathname } = splitLocale(request.nextUrl.pathname);

  if (!data?.claims && !isPublic(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${ROUTES.login}`;
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  return response;
}
