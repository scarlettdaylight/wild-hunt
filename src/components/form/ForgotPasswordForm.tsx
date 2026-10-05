"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { requestPasswordReset } from "@/lib/auth/actions";
import { buildLocalizedPath, ROUTES } from "@/lib/routes";
import { PrimaryButton } from "@/components/ui/Button";
import { Field } from "./Field";
import { FormError } from "./FormError";
import { FormShell } from "./FormShell";

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [state, formAction] = useActionState(requestPasswordReset, undefined);

  if (state?.sent) {
    return (
      <FormShell
        title={t("auth.forgotPassword.sentTitle")}
        description={t("auth.forgotPassword.sentDescription")}
      >
        <Link
          href={buildLocalizedPath(locale, ROUTES.home)}
          className="mt-6 inline-block text-sm text-link underline underline-offset-4 hover:text-link-hover"
        >
          {t("common.backToSignIn")}
        </Link>
      </FormShell>
    );
  }

  return (
    <FormShell
      title={t("auth.forgotPassword.title")}
      description={t("auth.forgotPassword.description")}
    >
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="locale" value={locale} />
        <Field
          label={t("auth.fields.email")}
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        <FormError message={state?.error} />
        <PrimaryButton type="submit">
          {t("auth.forgotPassword.sendResetLink")}
        </PrimaryButton>
      </form>

      <p className="mt-6 text-sm text-muted">
        {t("auth.forgotPassword.remembered")}{" "}
        <Link
          href={buildLocalizedPath(locale, ROUTES.home)}
          className="text-link underline underline-offset-4 hover:text-link-hover"
        >
          {t("auth.signIn.title")}
        </Link>
      </p>
    </FormShell>
  );
}
