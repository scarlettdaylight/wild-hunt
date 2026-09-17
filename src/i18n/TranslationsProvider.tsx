"use client";

import { createInstance, type Resource } from "i18next";
import { useState } from "react";
import { I18nextProvider, initReactI18next } from "react-i18next";

import { getOptions, type Locale } from "./settings";

/**
 * Hydrates a client-side `i18next` instance with the resources the server
 * already loaded for this locale, so `useTranslation` in Client Components
 * works without a second fetch or a flash of untranslated content.
 */
export function TranslationsProvider({
  children,
  locale,
  resources,
}: {
  children: React.ReactNode;
  locale: Locale;
  resources: Resource;
}) {
  const [i18n] = useState(() => {
    const instance = createInstance();
    instance.use(initReactI18next).init({
      ...getOptions(locale),
      resources,
    });
    return instance;
  });

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
