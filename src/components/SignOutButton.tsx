"use client";

import { useActionState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { signOut } from "@/lib/auth/actions";
import { TextButton } from "@/components/ui/Button";

export const SignOutButton = () => {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [, formAction] = useActionState(signOut, undefined);

  return (
    <form action={formAction}>
      <input type="hidden" name="locale" value={locale} />
      <TextButton type="submit">{t("common.signOut")}</TextButton>
    </form>
  );
};
