type Props = React.ComponentProps<"button">;

export const primaryButtonClassName =
  "rounded-xl px-4 py-3 font-serif text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50 bg-primary text-off-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)] cursor-pointer disabled:cursor-not-allowed";

export const PrimaryButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={[primaryButtonClassName, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export const secondaryButtonClassName =
  "rounded-xl px-4 py-3 font-serif text-sm font-bold transition-opacity hover:opacity-90 disabled:opacity-50 border border-hairline-card bg-off-white text-primary cursor-pointer disabled:cursor-not-allowed";

export const SecondaryButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={[secondaryButtonClassName, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};

export const textButtonClassName =
  "text-sm font-medium text-muted transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed";

export const TextButton = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={[textButtonClassName, className].filter(Boolean).join(" ")}
      {...props}
    >
      {children}
    </button>
  );
};
