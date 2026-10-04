import { JobApplicationList } from "@/components/jobs/JobApplicationList";
import { RetryErrorBoundary } from "@/components/RetryErrorBoundary";
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
      <RetryErrorBoundary
        className="mt-2"
        message={t("jobs.loadError")}
        retryLabel={t("jobs.retry")}
      >
        <JobApplicationList />
      </RetryErrorBoundary>
    </div>
  );
}
