"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useParams } from "next/navigation";
import { useTranslation } from "react-i18next";

import { signIn } from "@/lib/auth/actions";
import { buildLocalizedPath, ROUTES } from "@/lib/routes";
import { FormError } from "@/components/form/FormError";

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

export const SignInPanel=() => {
  const { t } = useTranslation();
  const { locale } = useParams<{ locale: string }>();
  const [state, formAction, pending] = useActionState(signIn, undefined);

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
        <Link
          href={buildLocalizedPath(locale, ROUTES.signUp)}
          className="text-link underline-offset-4 hover:text-link-hover hover:underline"
        >
          {t("home.signIn.onboard")}
        </Link>
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

        <button
          type="submit"
          disabled={pending}
          className="rounded-xl bg-primary px-4 py-3 font-serif text-sm font-bold text-off-white shadow-[inset_0_-3px_0_rgba(0,0,0,0.2)] transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? t("common.working") : t("home.signIn.submit")}
        </button>
      </form>

      <Link
        href={buildLocalizedPath(locale, ROUTES.signUp)}
        className="mt-4 block py-2 text-center font-serif text-sm font-bold text-orange-text transition-colors hover:text-accent"
      >
        {t("home.signIn.signUp")}
      </Link>
    </div>
  );
}
