import "server-only";
import { createInstance } from "i18next";
import resourcesToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next/initReactI18next";

import { defaultNS, getOptions, type Locale } from "./settings";

/**
 * A fresh `i18next` instance per call rather than a shared singleton: this runs
 * in Server Components, where a module-level instance would leak state between
 * concurrent requests for different locales.
 */
export async function getTranslation(locale: Locale, ns: string = defaultNS) {
  const i18nInstance = createInstance();

  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`./locales/${language}/${namespace}.json`),
      ),
    )
    .init(getOptions(locale, ns));

  return {
    t: i18nInstance.getFixedT(locale, ns),
    i18n: i18nInstance,
  };
}
