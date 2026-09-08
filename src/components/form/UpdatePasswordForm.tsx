"use client";

import { useActionState } from "react";

import { updatePassword } from "@/app/auth/actions";
import { Field } from "./Field";
import { FormError } from "./FormError";
import { FormShell } from "./FormShell";
import { SubmitButton } from "./SubmitButton";

export function UpdatePasswordForm() {
  const [state, formAction, pending] = useActionState(updatePassword, undefined);

  return (
    <FormShell title="Choose a new password">
      <form action={formAction} className="mt-8 flex flex-col gap-4">
        <Field
          label="New password"
          type="password"
          name="password"
          autoComplete="new-password"
          minLength={6}
          required
        />
        <FormError message={state?.error} />
        <SubmitButton pending={pending} pendingLabel="Saving…">
          Save password
        </SubmitButton>
      </form>
    </FormShell>
  );
}
