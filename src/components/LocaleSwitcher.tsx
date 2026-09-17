"use client";

import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { locales } from "@/i18n/settings";

/** Swaps the locale segment of the current URL, keeping the rest of the path. */
export function LocaleSwitcher() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();

  function switchTo(nextLocale: string) {
    const [, , ...rest] = pathname.split("/");
    const suffix = rest.join("/");
    router.replace(suffix ? `/${nextLocale}/${suffix}` : `/${nextLocale}`);
  }

  return (
    <label className="flex items-center gap-1.5 text-sm text-muted">
      <span className="sr-only">{t("localeSwitcher.label")}</span>
      <select
        value={i18n.language}
        onChange={(event) => switchTo(event.target.value)}
        className="rounded-md border border-hairline bg-transparent px-1.5 py-1 text-sm"
      >
        {locales.map((cur) => (
          <option key={cur} value={cur}>
            {t(`localeSwitcher.${cur}`)}
          </option>
        ))}
      </select>
    </label>
  );
}
