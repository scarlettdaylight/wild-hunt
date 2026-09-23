import Link from "next/link";

import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { ROUTES } from "@/lib/routes";
import { getLocalizedPath } from "@/lib/getLocalizedPath";
import { getAuthUser } from "@/lib/auth/getAuthUser";

export default async function Home() {
  const user = await getAuthUser();
  const { t } = await getCurrentLocaleTranslation();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-24">
      <h1 className="font-serif text-4xl font-bold tracking-tight">
        {t("common.brand")}
      </h1>
      <p className="mt-4 max-w-prose text-muted">{t("home.tagline")}</p>

      <Link
        href={await getLocalizedPath(user ? ROUTES.dashboard : ROUTES.signUp)}
        className="mt-8 inline-block rounded-md bg-primary px-5 py-2.5 font-serif text-sm font-semibold text-off-white transition-opacity hover:opacity-90"
      >
        {user ? t("home.goToApp") : t("home.getStarted")}
      </Link>
    </div>
  );
}
