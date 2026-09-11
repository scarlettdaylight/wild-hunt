"use client";

import Link from "next/link";
import { useActionState } from "react";

import { requestPasswordReset } from "@/app/auth/actions";
import { Field } from "./Field";
import { FormError } from "./FormError";
import { FormShell } from "./FormShell";
import { SubmitButton } from "./SubmitButton";

export function ForgotPasswordForm() {
  const [state, formAction, pending] = useActionState(
    requestPasswordReset,
    undefined,
  );

  if (state?.sent) {
    return (
      <FormShell
        title="Check your email"
        description="If that address has an account, a password reset link is on its way."
      >
        <Link
          href="/auth/login"
          className="mt-6 inline-block text-sm text-link underline underline-offset-4 hover:text-link-hover"
        >
          Back to sign in
        </Link>
      </FormShell>
    );
  }

  return (
    <FormShell
      title="Reset password"
      description="We'll email you a link to choose a new one."
    >
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <Field label="Email" type="email" name="email" autoComplete="email" required />
        <FormError message={state?.error} />
        <SubmitButton pending={pending} pendingLabel="Sending…">
          Send reset link
        </SubmitButton>
      </form>

      <p className="mt-6 text-sm text-muted">
        Remembered it?{" "}
        <Link
          href="/auth/login"
          className="text-link underline underline-offset-4 hover:text-link-hover"
        >
          Sign in
        </Link>
      </p>
    </FormShell>
  );
}
