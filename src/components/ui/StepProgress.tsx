export const StepProgress = ({
  step,
  totalSteps,
}: {
  step: number;
  totalSteps: number;
}) => {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: totalSteps }, (_, index) => (
        <div
          key={index}
          className={`h-1 w-8 rounded-full ${
            index < step ? "bg-accent" : "bg-hairline-card"
          }`}
        />
      ))}
    </div>
  );
};
