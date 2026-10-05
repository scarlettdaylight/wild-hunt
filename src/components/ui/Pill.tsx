export const Pill = ({
  selected,
  ...props
}: { selected: boolean } & React.ComponentProps<"button">) => {
  return (
    <button
      type="button"
      className={`rounded-xl border px-3 py-2 text-sm font-medium transition-colors ${
        selected
          ? "border-accent bg-selected-fill text-orange-text"
          : "border-hairline-card bg-off-white text-foreground hover:border-primary"
      }`}
      {...props}
    />
  );
};
