"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { signUp } from "@/lib/auth/actions";
import { buildLocalizedPath, ROUTES } from "@/lib/routes";
import { TextButton } from "@/components/ui/Button";
import { StepProgress } from "@/components/ui/StepProgress";
import { ChevronLeftIcon } from "@/components/icons";
import { Step1Fields } from "./Step1Fields";
import { Step2Fields } from "./Step2Fields";
import { Step3Fields } from "./Step3Fields";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const isValidPassword = (password: string) =>
  password.length >= 8 && /\d/.test(password);

const TOTAL_STEPS = 3;

export const SignUpForm = () => {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [step, setStep] = useState(1);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const [yearsOfExperience, setYearsOfExperience] = useState<string | null>(
    null,
  );
  const [role, setRole] = useState("");
  const [field, setField] = useState<string | null>(null);

  const [goals, setGoals] = useState<string[]>([]);
  const [weeklyTarget, setWeeklyTarget] = useState<string | null>(null);

  const toggleGoal = (goal: string) => {
    setGoals((current) =>
      current.includes(goal)
        ? current.filter((g) => g !== goal)
        : [...current, goal],
    );
  };

  const handleSubmit = async (formData: FormData) => {
    const result = await signUp(undefined, formData);
    if (result?.error) {
      setError(result.error);
      setStep(1);
    }
  };

  const emailValid = EMAIL_PATTERN.test(email);
  const passwordValid = isValidPassword(password);
  const emailError =
    emailTouched && email && !emailValid
      ? t("auth.signUp.step1.emailInvalid")
      : undefined;
  const passwordError =
    passwordTouched && password && !passwordValid
      ? t("auth.signUp.step1.passwordInvalid")
      : undefined;

  const step1Complete = Boolean(fullName && emailValid && passwordValid);
  const step2Complete = Boolean(yearsOfExperience && role && field);

  return (
    <div className="w-full max-w-sm">
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            aria-label={t("auth.signUp.back")}
            onClick={() => setStep((current) => current - 1)}
            className="grid size-8 place-items-center rounded-full border border-hairline-card bg-off-white text-primary transition-colors hover:border-primary"
          >
            <ChevronLeftIcon className="size-4" />
          </button>
        ) : (
          <span />
        )}
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
          {t("auth.signUp.stepLabel", { current: step, total: TOTAL_STEPS })}
        </span>
        <StepProgress step={step} totalSteps={TOTAL_STEPS} />
      </div>

      <h2 className="mt-4 font-serif text-[1.75rem] leading-tight font-bold tracking-tight">
        {t(`auth.signUp.step${step}.title`)}
      </h2>
      <p className="mt-2 text-sm text-subtle">
        {t(`auth.signUp.step${step}.description`)}
      </p>

      <form action={handleSubmit} className="mt-6 flex flex-col gap-4">
        <input type="hidden" name="locale" value={locale} />
        <input type="hidden" name="fullName" value={fullName} />
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="password" value={password} />
        <input
          type="hidden"
          name="yearsOfExperience"
          value={yearsOfExperience ?? ""}
        />
        <input type="hidden" name="role" value={role} />
        <input type="hidden" name="field" value={field ?? ""} />
        {goals.map((goal) => (
          <input key={goal} type="hidden" name="goals" value={goal} />
        ))}
        <input type="hidden" name="weeklyTarget" value={weeklyTarget ?? ""} />

        {step === 1 && (
          <Step1Fields
            fullName={fullName}
            onFullNameChange={setFullName}
            email={email}
            onEmailChange={setEmail}
            onEmailBlur={() => setEmailTouched(true)}
            emailError={emailError}
            password={password}
            onPasswordChange={setPassword}
            onPasswordBlur={() => setPasswordTouched(true)}
            passwordError={passwordError}
            formError={error}
            continueDisabled={!step1Complete}
            onContinue={() => setStep(2)}
          />
        )}

        {step === 2 && (
          <Step2Fields
            yearsOfExperience={yearsOfExperience}
            onYearsOfExperienceChange={setYearsOfExperience}
            role={role}
            onRoleChange={setRole}
            field={field}
            onFieldChange={setField}
            continueDisabled={!step2Complete}
            onContinue={() => setStep(3)}
          />
        )}

        {step === 3 && (
          <Step3Fields
            goals={goals}
            onToggleGoal={toggleGoal}
            weeklyTarget={weeklyTarget}
            onWeeklyTargetChange={setWeeklyTarget}
          />
        )}
      </form>

      <TextButton
        type="button"
        className="mt-4 w-full text-link hover:text-link-hover hover:underline"
        onClick={() => router.push(buildLocalizedPath(locale, ROUTES.home))}
      >
        {t("auth.signUp.haveAccount")} {t("auth.signUp.signIn")}
      </TextButton>
    </div>
  );
};
