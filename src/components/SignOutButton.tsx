"use client";

import { useActionState } from "react"
import { useTranslation } from "react-i18next";
import { signOut } from "@/lib/auth/actions";

import { useParams } from "next/navigation";



export const SignOutButton =()=> {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [state, formAction, pending] = useActionState(signOut, undefined);
      
    return (
            <form action={formAction}>
              <input type="hidden" name="locale" value={locale} />
              <button
                type="submit"
                className="text-muted underline-offset-4 hover:underline"
              >
                {t("common.signOut")}
              </button>
            </form>
    );
}