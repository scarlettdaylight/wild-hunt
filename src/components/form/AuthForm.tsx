"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useSearchParams } from "next/navigation";

import type { AuthState } from "@/app/auth/actions";
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
  const [state, formAction, pending] = useActionState(action, undefined);
  const redirectTo = useSearchParams().get("redirect");

  return (
    <FormShell title={title}>
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        {redirectTo && <input type="hidden" name="redirect" value={redirectTo} />}

        <Field label="Email" type="email" name="email" autoComplete="email" required />
        <Field
          label="Password"
          type="password"
          name="password"
          autoComplete={showForgotPassword ? "current-password" : "new-password"}
          minLength={6}
          required
        />

        {showForgotPassword && (
          <Link
            href="/auth/forgot-password"
            className="-mt-1 self-start text-sm text-link underline underline-offset-4 hover:text-link-hover"
          >
            Forgot password?
          </Link>
        )}

        <FormError message={state?.error} />
        <SubmitButton pending={pending}>{submitLabel}</SubmitButton>
      </form>

      <p className="mt-6 text-sm text-muted">
        {footer.prompt}{" "}
        <Link
          href={footer.href}
          className="text-link underline underline-offset-4 hover:text-link-hover"
        >
          {footer.linkLabel}
        </Link>
      </p>
    </FormShell>
  );
}
