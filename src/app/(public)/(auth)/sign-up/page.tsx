import { Suspense } from "react";

import { AuthForm } from "@/components/form/AuthForm";
import { signUp } from "@/lib/auth/actions";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Create account · Wild Hunt" };

export default function SignUpPage() {
  return (
    <Suspense>
      <AuthForm
        title="Create account"
        submitLabel="Create account"
        action={signUp}
        footer={{
          prompt: "Already have an account?",
          href: ROUTES.login,
          linkLabel: "Sign in",
        }}
      />
    </Suspense>
  );
}
