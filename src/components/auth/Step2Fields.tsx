import { useTranslation } from "react-i18next";

import { PanelField } from "@/components/form/PanelField";
import { PrimaryButton } from "@/components/ui/Button";
import { Pill } from "@/components/ui/Pill";

const YEARS_OF_EXPERIENCE = ["0-2", "3-5", "6-9", "10+"] as const;
const FIELDS = [
  "engineering",
  "design",
  "product",
  "data",
  "marketing",
  "other",
] as const;

type Props = {
  yearsOfExperience: string | null;
  onYearsOfExperienceChange: (value: string) => void;
  role: string;
  onRoleChange: (value: string) => void;
  field: string | null;
  onFieldChange: (value: string) => void;
  continueDisabled: boolean;
  onContinue: () => void;
};

export const Step2Fields = ({
  yearsOfExperience,
  onYearsOfExperienceChange,
  role,
  onRoleChange,
  field,
  onFieldChange,
  continueDisabled,
  onContinue,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
          {t("auth.signUp.step2.yearsOfExperience")}
        </span>
        <div className="grid grid-cols-4 gap-2">
          {YEARS_OF_EXPERIENCE.map((value) => (
            <Pill
              key={value}
              selected={yearsOfExperience === value}
              onClick={() => onYearsOfExperienceChange(value)}
            >
              {t(`auth.signUp.step2.experience.${value}`)}
            </Pill>
          ))}
        </div>
      </div>

      <PanelField
        label={t("auth.signUp.step2.currentRole")}
        type="text"
        placeholder={t("auth.signUp.step2.currentRolePlaceholder")}
        value={role}
        onChange={(e) => onRoleChange(e.target.value)}
        required
      />

      <div className="flex flex-col gap-2">
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
          {t("auth.signUp.step2.field")}
        </span>
        <div className="flex flex-wrap gap-2">
          {FIELDS.map((value) => (
            <Pill
              key={value}
              selected={field === value}
              onClick={() => onFieldChange(value)}
            >
              {t(`auth.signUp.step2.fields.${value}`)}
            </Pill>
          ))}
        </div>
      </div>

      <PrimaryButton
        type="button"
        disabled={continueDisabled}
        onClick={onContinue}
      >
        {t("auth.signUp.step2.continue")}
      </PrimaryButton>
    </>
  );
};
