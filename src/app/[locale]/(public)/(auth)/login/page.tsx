import { Suspense } from "react";

import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { AuthForm } from "@/components/form/AuthForm";
import { signIn } from "@/lib/auth/actions";
import { ROUTES } from "@/lib/routes";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.signIn.metaTitle") };
}

export default async function LoginPage() {
  const { t } = await getCurrentLocaleTranslation();

  return (
    // AuthForm reads ?redirect= via useSearchParams, which needs a Suspense boundary.
    <Suspense>
      <AuthForm
        title={t("auth.signIn.title")}
        submitLabel={t("auth.signIn.submit")}
        action={signIn}
        showForgotPassword
        footer={{
          prompt: t("auth.signIn.noAccount"),
          href: ROUTES.signUp,
          linkLabel: t("auth.signIn.createOne"),
        }}
      />
    </Suspense>
  );
}
