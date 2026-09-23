import Link from "next/link";

import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { FormShell } from "@/components/form/FormShell";
import { ROUTES } from "@/lib/routes";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.checkEmail.metaTitle") };
}

export default async function CheckEmailPage() {
  const { t } = await getCurrentLocaleTranslation();

  return (
    <FormShell
      title={t("auth.checkEmail.title")}
      description={t("auth.checkEmail.description")}
    >
      <Link
        href={await getLocalizedPath(ROUTES.login)}
        className="mt-6 inline-block text-sm underline underline-offset-4"
      >
        {t("common.backToSignIn")}
      </Link>
    </FormShell>
  );
}
