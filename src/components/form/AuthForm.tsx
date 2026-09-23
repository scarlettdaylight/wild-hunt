"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import type { AuthState } from "@/lib/auth/actions";
import { localizedPath, ROUTES } from "@/lib/routes";
import { Field } from "./Field";
import { FormError } from "./FormError";
import { FormShell } from "./FormShell";
import { SubmitButton } from "./SubmitButton";

type Props = {
  title: string;
  submitLabel: string;
  action: (state: AuthState, formData: FormData) => Promise<AuthState>;
  /** Shown under the password field. Only the sign-in screen needs it. */
  showForgotPassword?: boolean;
  footer: { prompt: string; href: string; linkLabel: string };
};

export function AuthForm({
  title,
  submitLabel,
  action,
  showForgotPassword,
  footer,
}: Props) {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [state, formAction, pending] = useActionState(action, undefined);
  const redirectTo = useSearchParams().get("redirect");

  return (
    <FormShell title={title}>
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <input type="hidden" name="locale" value={locale} />
        {redirectTo && (
          <input type="hidden" name="redirect" value={redirectTo} />
        )}

        <Field
          label={t("auth.fields.email")}
          type="email"
          name="email"
          autoComplete="email"
          required
        />
        <Field
          label={t("auth.fields.password")}
          type="password"
          name="password"
          autoComplete={
            showForgotPassword ? "current-password" : "new-password"
          }
          minLength={6}
          required
        />

        {showForgotPassword && (
          <Link
            href={localizedPath(locale, ROUTES.forgotPassword)}
            className="-mt-1 self-start text-sm text-link underline underline-offset-4 hover:text-link-hover"
          >
            {t("auth.signIn.forgotPassword")}
          </Link>
        )}

        <FormError message={state?.error} />
        <SubmitButton pending={pending} pendingLabel={t("common.working")}>
          {submitLabel}
        </SubmitButton>
      </form>

      <p className="mt-6 text-sm text-muted">
        {footer.prompt}{" "}
        <Link
          href={localizedPath(locale, footer.href)}
          className="text-link underline underline-offset-4 hover:text-link-hover"
        >
          {footer.linkLabel}
        </Link>
      </p>
    </FormShell>
  );
}
