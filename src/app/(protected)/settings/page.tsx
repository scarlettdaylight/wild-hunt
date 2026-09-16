export const metadata = { title: "Settings · Wild Hunt" };

/** Account and preferences for the signed-in user. */
export default function SettingsPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 py-12">
      <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
      <p className="mt-2 text-sm text-black/60 dark:text-white/60">
        Nothing to configure yet.
      </p>
    </div>
  );
}
