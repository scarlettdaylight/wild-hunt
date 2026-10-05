export const CheckboxRow = ({
  selected,
  children,
  ...props
}: {
  selected: boolean;
  children: React.ReactNode;
} & React.ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${
        selected
          ? "border-accent bg-selected-fill text-orange-text"
          : "border-hairline-card bg-off-white text-foreground hover:border-primary"
      }`}
      {...props}
    >
      <span
        className={`size-4 shrink-0 rounded ${
          selected ? "bg-accent" : "border border-hairline-card"
        }`}
      />
      {children}
    </button>
  );
};
