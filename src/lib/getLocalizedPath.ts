import { locale } from "next/root-params";
import type { Locale } from "@/i18n/settings";
import { buildLocalizedPath } from "@/lib/routes";

export const getLocalizedPath = async (route: string) => {
  const currentLocale = (await locale()) as Locale;
  return buildLocalizedPath(currentLocale, route);
};
