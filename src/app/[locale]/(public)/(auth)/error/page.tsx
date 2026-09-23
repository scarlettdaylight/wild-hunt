import Link from "next/link";

import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { FormShell } from "@/components/form/FormShell";
import { ROUTES } from "@/lib/routes";
import { getLocalizedPath } from "@/lib/getLocalizedPath";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.error.metaTitle") };
}

export default async function AuthErrorPage({
  searchParams,
}: PageProps<"/[locale]/error">) {
  const { error } = await searchParams;
  const { t } = await getCurrentLocaleTranslation();

  return (
    <FormShell
      title={t("auth.error.title")}
      description={
        typeof error === "string" ? error : t("auth.error.unspecified")
      }
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
