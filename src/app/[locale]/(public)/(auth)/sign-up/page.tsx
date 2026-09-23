import { Suspense } from "react";

import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { AuthForm } from "@/components/form/AuthForm";
import { signUp } from "@/lib/auth/actions";
import { ROUTES } from "@/lib/routes";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.signUp.metaTitle") };
}

export default async function SignUpPage() {
  const { t } = await getCurrentLocaleTranslation();

  return (
    <Suspense>
      <AuthForm
        title={t("auth.signUp.title")}
        submitLabel={t("auth.signUp.submit")}
        action={signUp}
        footer={{
          prompt: t("auth.signUp.haveAccount"),
          href: ROUTES.login,
          linkLabel: t("auth.signUp.signIn"),
        }}
      />
    </Suspense>
  );
}
