"use client";

import { useActionState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { updatePassword } from "@/lib/auth/actions";
import { Field } from "./Field";
import { FormError } from "./FormError";
import { FormShell } from "./FormShell";
import { SubmitButton } from "./SubmitButton";

export function UpdatePasswordForm() {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [state, formAction, pending] = useActionState(updatePassword, undefined);

  return (
    <FormShell title={t("auth.updatePassword.title")}>
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="locale" value={locale} />
        <Field
          label={t("auth.fields.newPassword")}
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={6}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending} pendingLabel={t("auth.updatePassword.saving")}>
          {t("auth.updatePassword.submit")}
        </SubmitButton>
      </form>
    </FormShell>
  );
}
