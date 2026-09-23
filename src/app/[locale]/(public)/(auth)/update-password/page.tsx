import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { UpdatePasswordForm } from "@/components/form/UpdatePasswordForm";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.updatePassword.metaTitle") };
}

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
