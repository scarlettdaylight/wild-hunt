export const PanelField = ({
  label,
  ...props
}: { label: string } & React.ComponentProps<"input">) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
        {label}
      </span>
      <input
        className="rounded-xl border border-hairline-card bg-off-white px-3 py-3 text-sm transition-colors outline-none placeholder:text-faint focus:border-primary"
        {...props}
      />
    </label>
  );
};
