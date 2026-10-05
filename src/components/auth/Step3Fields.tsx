import { useTranslation } from "react-i18next";

import { PrimaryButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";
import { CheckboxRow } from "@/components/ui/CheckboxRow";

const GOALS = [
  "firstRole",
  "seniorTitle",
  "switchIndustry",
  "stayOrganised",
] as const;
const WEEKLY_TARGETS = ["2", "5", "10", "15"] as const;

type Props = {
  goals: string[];
  onToggleGoal: (goal: string) => void;
  weeklyTarget: string | null;
  onWeeklyTargetChange: (value: string) => void;
};

export const Step3Fields = ({
  goals,
  onToggleGoal,
  weeklyTarget,
  onWeeklyTargetChange,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
          {t("auth.signUp.step3.whatBringsYouHere")}
        </span>
        <div className="flex flex-col gap-2">
          {GOALS.map((goal) => (
            <CheckboxRow
              key={goal}
              selected={goals.includes(goal)}
              onClick={() => onToggleGoal(goal)}
            >
              {t(`auth.signUp.step3.goals.${goal}`)}
            </CheckboxRow>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
          {t("auth.signUp.step3.weeklyTarget")}
        </span>
        <div className="grid grid-cols-4 gap-2">
          {WEEKLY_TARGETS.map((value) => (
            <Pill
              key={value}
              selected={weeklyTarget === value}
              onClick={() => onWeeklyTargetChange(value)}
            >
              {t(`auth.signUp.step3.targets.${value}`)}
            </Pill>
          ))}
        </div>
        <p className="text-xs text-faint">
          {t("auth.signUp.step3.weeklyTargetHint")}
        </p>
      </div>

      <PrimaryButton type="submit">
        {t("auth.signUp.step3.submit")}
      </PrimaryButton>
    </>
  );
};
