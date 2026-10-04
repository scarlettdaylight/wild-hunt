import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import {
  type ApplicationStatus,
  getJobApplications,
} from "@/lib/jobs/getJobApplications";

const STATUS_DOT_CLASS: Record<ApplicationStatus, string> = {
  saved: "bg-label",
  applied: "bg-status-pending",
  interview: "bg-status-interview",
  rejected: "bg-status-rejected",
  offer: "bg-status-offer",
};

export const JobApplicationList = async () => {
  const { t } = await getCurrentLocaleTranslation();
  const applications = await getJobApplications();

  if (applications.length === 0) {
    return (
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        {t("jobs.empty")}
      </p>
    );
  }

  return (
    <ul className="mt-6 divide-y divide-black/10 border-y border-black/10 dark:divide-white/10 dark:border-white/10">
      {applications.map((application) => (
        <li
          key={application.id}
          className="flex items-start justify-between gap-4 py-4"
        >
          <div className="min-w-0">
            <p className="truncate font-medium">{application.name}</p>
            <p className="mt-1 truncate text-sm text-black/60 dark:text-white/60">
              {[application.companies.name, application.location]
                .filter(Boolean)
                .join(" · ")}
            </p>
          </div>
          <span className="flex shrink-0 items-center gap-2 text-sm">
            <span
              aria-hidden
              className={`size-2 rounded-full ${STATUS_DOT_CLASS[application.status]}`}
            />
            {t(`jobs.status.${application.status}`)}
          </span>
        </li>
      ))}
    </ul>
  );
};
