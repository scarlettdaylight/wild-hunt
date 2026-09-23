import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("documents.metaTitle") };
}

/** CVs and cover letters, ready to attach to an application. */
export default async function DocumentsPage() {
  const { t } = await getCurrentLocaleTranslation();

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
