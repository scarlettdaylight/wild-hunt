export function FormShell({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-sm px-6 py-16">
      <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
      {description && (
        <p className="mt-2 text-sm leading-relaxed text-black/60 dark:text-white/60">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
