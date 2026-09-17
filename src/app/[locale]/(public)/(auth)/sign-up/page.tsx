import { locale } from "next/root-params";
import { Suspense } from "react";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { AuthForm } from "@/components/form/AuthForm";
import { signUp } from "@/lib/auth/actions";
import { ROUTES } from "@/lib/routes";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("auth.signUp.metaTitle") };
}

export default async function SignUpPage() {
  const { t } = await getTranslation((await locale()) as Locale);

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
