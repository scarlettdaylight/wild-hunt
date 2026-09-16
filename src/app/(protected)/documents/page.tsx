export const metadata = { title: "Documents · Wild Hunt" };

/** CVs and cover letters, ready to attach to an application. */
export default function DocumentsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Documents</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        No documents uploaded yet.
      </p>
    </div>
  );
}
