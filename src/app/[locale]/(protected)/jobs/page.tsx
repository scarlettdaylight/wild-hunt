import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("jobs.metaTitle") };
}

/** Applications being tracked, with their stage in the process. */
export default async function JobsPage() {
  const { t } = await getCurrentLocaleTranslation();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("jobs.heading")}
      </h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        {t("jobs.empty")}
      </p>
    </div>
  );
}
