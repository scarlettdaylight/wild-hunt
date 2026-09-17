import { NextResponse, type NextRequest } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

import { defaultLocale, locales, localeCookie, type Locale } from "@/i18n/settings";
import { updateSession } from "@/lib/supabase/proxy";

function hasLocalePrefix(pathname: string) {
  return locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );
}

/** Prefers a cookie from an earlier visit (e.g. the locale switcher) over `Accept-Language`. */
function resolveLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get(localeCookie)?.value;
  if ((locales as readonly string[]).includes(cookieLocale ?? "")) {
    return cookieLocale as Locale;
  }

  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale) as Locale;
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!hasLocalePrefix(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${resolveLocale(request)}${pathname}`;
    return NextResponse.redirect(url);
  }

  const response = await updateSession(request);

  // Keeps a bare `/` landing on the locale this visitor last used.
  const [, locale] = pathname.split("/");
  response.cookies.set(localeCookie, locale, { path: "/", sameSite: "lax" });

  return response;
}

export const config = {
  matcher: [
    /*
     * Every path except static assets and images — those never need a session
     * refresh, and running on them wastes a round trip per file.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
