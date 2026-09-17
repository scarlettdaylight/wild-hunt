import { locale } from "next/root-params";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("documents.metaTitle") };
}

/** CVs and cover letters, ready to attach to an application. */
export default async function DocumentsPage() {
  const { t } = await getTranslation((await locale()) as Locale);

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("documents.heading")}
      </h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        {t("documents.empty")}
      </p>
    </div>
  );
}
