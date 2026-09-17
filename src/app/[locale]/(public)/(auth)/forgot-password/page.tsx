import { locale } from "next/root-params";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { ForgotPasswordForm } from "@/components/form/ForgotPasswordForm";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("auth.forgotPassword.metaTitle") };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
