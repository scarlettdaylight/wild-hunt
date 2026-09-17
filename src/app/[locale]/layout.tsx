import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getTranslation } from "@/i18n/server";
import { locales, type Locale } from "@/i18n/settings";
import { TranslationsProvider } from "@/i18n/TranslationsProvider";
import "../globals.css";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(
  props: Omit<LayoutProps<"/[locale]">, "children">,
): Promise<Metadata> {
  const { locale } = await props.params;
  const { t } = await getTranslation(locale as Locale);

  return {
    title: t("metadata.title"),
    description: t("metadata.description"),
  };
}

/**
 * The document shell, and nothing else. The header belongs to each route group's
 * layout rather than here, so the signed-in sidebar can run the full height of
 * the window with the header beside it instead of above it.
 */
export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  const { i18n } = await getTranslation(locale as Locale);

  return (
    <html lang={locale} className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <TranslationsProvider
          locale={locale as Locale}
          resources={i18n.services.resourceStore.data}
        >
          {children}
        </TranslationsProvider>
      </body>
    </html>
  );
}
