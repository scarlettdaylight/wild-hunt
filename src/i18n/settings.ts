export const locales = ["en", "zh-TW"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

/** Everything lives in one namespace — the app is too small to split translations up. */
export const defaultNS = "translation";

/** Remembers the last locale a visitor picked, so a bare `/` redirects there next time. */
export const localeCookie = "wild-hunt-locale";

export function getOptions(locale: Locale = defaultLocale, ns: string | string[] = defaultNS) {
  return {
    supportedLngs: locales,
    fallbackLng: defaultLocale,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
    interpolation: { escapeValue: false },
  };
}
