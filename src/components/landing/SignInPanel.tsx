"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

import { signIn } from "@/lib/auth/actions";
import { buildLocalizedPath, ROUTES } from "@/lib/routes";
import { FormError } from "@/components/form/FormError";
import {
  PrimaryButton,
  SecondaryButton,
  TextButton,
} from "@/components/ui/Button";
import { GoogleIcon, LinkedInIcon } from "@/components/icons";

const PanelField = ({
  label,
  ...props
}: { label: string } & React.ComponentProps<"input">) => {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-label uppercase">
        {label}
      </span>
      <input
        className="rounded-xl border border-hairline-card bg-off-white px-3 py-3 text-sm transition-colors outline-none placeholder:text-faint focus:border-primary"
        {...props}
      />
    </label>
  );
};

export const SignInPanel = () => {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const router = useRouter();
  const [state, formAction] = useActionState(signIn, undefined);

  return (
    <div className="w-full max-w-sm">
      <p className="font-mono text-[11px] font-medium tracking-[0.18em] text-label uppercase">
        {t("home.signIn.eyebrow")}
      </p>
      <h2 className="mt-2 font-serif text-[1.75rem] leading-tight font-bold tracking-tight">
        {t("home.signIn.title")}
      </h2>
      <p className="mt-2 text-sm text-subtle">
        {t("home.signIn.noAccount")}{" "}
        <TextButton
          type="button"
          className="text-link hover:text-link-hover hover:underline"
          onClick={() => router.push(buildLocalizedPath(locale, ROUTES.signUp))}
        >
          {t("home.signIn.onboard")}
        </TextButton>
      </p>

      <form action={formAction} className="mt-6 flex flex-col gap-4">
        <input type="hidden" name="locale" value={locale} />

        <PanelField
          label={t("auth.fields.email")}
          type="email"
          name="email"
          autoComplete="email"
          placeholder={t("home.signIn.emailPlaceholder")}
          required
        />
        <PanelField
          label={t("auth.fields.password")}
          type="password"
          name="password"
          autoComplete="current-password"
          minLength={6}
          required
        />

        <Link
          href={buildLocalizedPath(locale, ROUTES.forgotPassword)}
          className="-mt-1 self-start text-sm text-link underline-offset-4 hover:text-link-hover hover:underline"
        >
          {t("auth.signIn.forgotPassword")}
        </Link>

        <FormError message={state?.error} />

        <PrimaryButton type="submit">{t("home.signIn.continue")}</PrimaryButton>
      </form>

      <div className="mt-4 flex items-center gap-3">
        <div className="h-px flex-1 bg-hairline-card" />
        <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-faint uppercase">
          {t("common.or")}
        </span>
        <div className="h-px flex-1 bg-hairline-card" />
      </div>

      <div className="mt-4 flex gap-3">
        <SecondaryButton className="inline-flex flex-1 items-center justify-center gap-2">
          <GoogleIcon className="size-5" />
          {t("home.signIn.google")}
        </SecondaryButton>
        <SecondaryButton className="inline-flex flex-1 items-center justify-center gap-2">
          <LinkedInIcon className="size-5" />
          {t("home.signIn.linkedIn")}
        </SecondaryButton>
      </div>
      <TextButton
        type="button"
        className="mt-4 w-full text-link hover:text-link-hover hover:underline"
        onClick={() => router.push(buildLocalizedPath(locale, ROUTES.signUp))}
      >
        {t("home.signIn.signUp")}
      </TextButton>
    </div>
  );
};
