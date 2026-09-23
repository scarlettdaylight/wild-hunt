import Link from "next/link";
import { locale } from "next/root-params";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { localizedPath, ROUTES } from "@/lib/routes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SignOutButton } from "./SignOutButton";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { ReactNode } from "react";

export async function SiteHeader({ leading }: { leading?: ReactNode }) {
  const user = await getAuthUser();

  const currentLocale = (await locale()) as Locale;
  const { t } = await getTranslation(currentLocale);

  return (
    <header className="border-b border-hairline bg-off-white">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {/* The (protected) layout passes the drawer trigger in here. */}
          {leading}
          <Link
            href={localizedPath(currentLocale, ROUTES.home)}
            className="font-semibold tracking-tight"
          >
            {t("common.brand")}
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <SignOutButton />
          ) : (
            <Link
              href={localizedPath(currentLocale, ROUTES.login)}
              className="underline-offset-4 hover:underline"
            >
              {t("common.signIn")}
            </Link>
          )}
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
