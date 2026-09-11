const inputClass =
  "rounded-md border border-hairline px-3 py-2 text-base outline-none focus:border-primary";

export function Field({
  label,
  ...props
}: { label: string } & React.ComponentProps<"input">) {
  return (
    <label className="flex flex-col gap-1.5 text-sm">
      <span className="font-medium">{label}</span>
      <input className={inputClass} {...props} />
    </label>
  );
}
