import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { ForgotPasswordForm } from "@/components/form/ForgotPasswordForm";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.forgotPassword.metaTitle") };
}

export default function ForgotPasswordPage() {
  return <ForgotPasswordForm />;
}
