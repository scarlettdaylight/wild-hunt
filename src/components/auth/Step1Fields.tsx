import { useTranslation } from "react-i18next";

import { PanelField } from "@/components/form/PanelField";
import { FormError } from "@/components/form/FormError";
import { PrimaryButton, SecondaryButton } from "@/components/ui/Button";
import { GoogleIcon, LinkedInIcon } from "@/components/icons";

type Props = {
  fullName: string;
  onFullNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  onEmailBlur: () => void;
  emailError?: string;
  password: string;
  onPasswordChange: (value: string) => void;
  onPasswordBlur: () => void;
  passwordError?: string;
  formError?: string;
  continueDisabled: boolean;
  onContinue: () => void;
};

export const Step1Fields = ({
  fullName,
  onFullNameChange,
  email,
  onEmailChange,
  onEmailBlur,
  emailError,
  password,
  onPasswordChange,
  onPasswordBlur,
  passwordError,
  formError,
  continueDisabled,
  onContinue,
}: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <SecondaryButton
        type="button"
        className="inline-flex items-center justify-center gap-2"
      >
        <GoogleIcon className="size-5" />
        {t("auth.signUp.step1.continueWithGoogle")}
      </SecondaryButton>
      <SecondaryButton
        type="button"
        className="inline-flex items-center justify-center gap-2"
      >
        <LinkedInIcon className="size-5 text-linkedin" />
        {t("auth.signUp.step1.continueWithLinkedIn")}
      </SecondaryButton>

      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-hairline-card" />
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-faint uppercase">
          {t("auth.signUp.step1.divider")}
        </span>
        <div className="h-px flex-1 bg-hairline-card" />
      </div>

      <PanelField
        label={t("auth.signUp.step1.fullName")}
        type="text"
        autoComplete="name"
        placeholder={t("auth.signUp.step1.fullNamePlaceholder")}
        value={fullName}
        onChange={(e) => onFullNameChange(e.target.value)}
        required
      />
      <div className="flex flex-col gap-2">
        <PanelField
          label={t("auth.fields.email")}
          type="email"
          autoComplete="email"
          placeholder={t("home.signIn.emailPlaceholder")}
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onBlur={onEmailBlur}
          required
        />
        <FormError message={emailError} />
      </div>
      <div className="flex flex-col gap-2">
        <PanelField
          label={t("auth.fields.password")}
          type="password"
          autoComplete="new-password"
          minLength={8}
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          onBlur={onPasswordBlur}
          required
        />
        <p className="text-xs text-faint">
          {t("auth.signUp.step1.passwordHint")}
        </p>
        <FormError message={passwordError} />
      </div>

      <FormError message={formError} />

      <PrimaryButton
        type="button"
        disabled={continueDisabled}
        onClick={onContinue}
      >
        {t("auth.signUp.step1.continue")}
      </PrimaryButton>
    </>
  );
};
