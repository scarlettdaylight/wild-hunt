import { Suspense } from "react";

import { AuthForm } from "@/components/form/AuthForm";
import { signIn } from "@/app/auth/actions";

export const metadata = { title: "Sign in · Wild Hunt" };

export default function LoginPage() {
  return (
    // AuthForm reads ?redirect= via useSearchParams, which needs a Suspense boundary.
    <Suspense>
      <AuthForm
        title="Sign in"
        submitLabel="Sign in"
        action={signIn}
        showForgotPassword
        footer={{
          prompt: "No account yet?",
          href: "/auth/sign-up",
          linkLabel: "Create one",
        }}
      />
    </Suspense>
  );
}
