import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { getAuthUser } from "@/lib/auth/getAuthUser";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("dashboard.metaTitle") };
}

/** Overview of the hunt: counts, recent activity, whatever needs attention. */
export default async function DashboardPage() {
  const user = await getAuthUser();
  const { t } = await getCurrentLocaleTranslation();

  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">
        {t("dashboard.heading")}
      </h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        {t("dashboard.signedInAs", { email: user?.email ?? "" })}
      </p>
    </div>
  );
}
