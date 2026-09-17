import { locale } from "next/root-params";
import { Suspense } from "react";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { AuthForm } from "@/components/form/AuthForm";
import { signIn } from "@/lib/auth/actions";
import { ROUTES } from "@/lib/routes";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("auth.signIn.metaTitle") };
}

export default async function LoginPage() {
  const { t } = await getTranslation((await locale()) as Locale);

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
