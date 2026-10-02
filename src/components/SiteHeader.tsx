import Link from "next/link";

import { ROUTES } from "@/lib/routes";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { SignInButton } from "./SignInButton";
import { SignOutButton } from "./SignOutButton";
import { getAuthUser } from "@/lib/auth/getAuthUser";
import { ReactNode } from "react";
import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

export async function SiteHeader({ leading }: { leading?: ReactNode }) {
  const user = await getAuthUser();
  const { t } = await getCurrentLocaleTranslation();

  return (
    <header className="border-b border-hairline bg-off-white">
      <nav className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-4">
        <div className="flex items-center gap-3">
          {leading}
          <Link
            href={await getLocalizedPath(ROUTES.home)}
            className="font-semibold tracking-tight"
          >
            {t("common.brand")}
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm">
          {user ? (
            <SignOutButton />
          ) : (
            <SignInButton href={await getLocalizedPath(ROUTES.login)} />
          )}
          <LocaleSwitcher />
        </div>
      </nav>
    </header>
  );
}
