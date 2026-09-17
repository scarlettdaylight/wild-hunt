import Link from "next/link";
import { locale } from "next/root-params";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { FormShell } from "@/components/form/FormShell";
import { localizedPath, ROUTES } from "@/lib/routes";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("auth.error.metaTitle") };
}

export default async function AuthErrorPage({
  searchParams,
}: PageProps<"/[locale]/error">) {
  const { error } = await searchParams;
  const currentLocale = (await locale()) as Locale;
  const { t } = await getTranslation(currentLocale);

  return (
    <FormShell
      title={t("auth.error.title")}
      description={typeof error === "string" ? error : t("auth.error.unspecified")}
    >
      <Link
        href={localizedPath(currentLocale, ROUTES.login)}
        className="mt-6 inline-block text-sm underline underline-offset-4"
      >
        {t("common.backToSignIn")}
      </Link>
    </FormShell>
  );
}
