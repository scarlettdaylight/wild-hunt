import Link from "next/link";
import { locale } from "next/root-params";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { FormShell } from "@/components/form/FormShell";
import { localizedPath, ROUTES } from "@/lib/routes";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("auth.checkEmail.metaTitle") };
}

export default async function CheckEmailPage() {
  const currentLocale = (await locale()) as Locale;
  const { t } = await getTranslation(currentLocale);

  return (
    <FormShell
      title={t("auth.checkEmail.title")}
      description={t("auth.checkEmail.description")}
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
