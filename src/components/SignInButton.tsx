"use client";

import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { TextButton } from "@/components/ui/Button";

export const SignInButton = ({ href }: { href: string }) => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <TextButton type="button" onClick={() => router.push(href)}>
      {t("common.signIn")}
    </TextButton>
  );
};
