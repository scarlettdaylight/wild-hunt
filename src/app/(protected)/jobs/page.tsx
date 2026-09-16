export const metadata = { title: "Jobs · Wild Hunt" };

/** Applications being tracked, with their stage in the process. */
export default function JobsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Jobs</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Nothing tracked yet.
      </p>
    </div>
  );
}
