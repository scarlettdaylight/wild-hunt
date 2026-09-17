import { locale } from "next/root-params";

import { getTranslation } from "@/i18n/server";
import type { Locale } from "@/i18n/settings";
import { UpdatePasswordForm } from "@/components/form/UpdatePasswordForm";

export async function generateMetadata() {
  const { t } = await getTranslation((await locale()) as Locale);
  return { title: t("auth.updatePassword.metaTitle") };
}

export default function UpdatePasswordPage() {
  return <UpdatePasswordForm />;
}
