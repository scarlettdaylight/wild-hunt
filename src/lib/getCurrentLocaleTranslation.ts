import { locale } from "next/root-params";
import type { Locale } from "@/i18n/settings";
import { getTranslation } from "@/i18n/server";

export const getCurrentLocaleTranslation = async () => {
  const currentLocale = (await locale()) as Locale;
  return await getTranslation(currentLocale);
};
