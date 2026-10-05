import { Suspense } from "react";

import { getCurrentLocaleTranslation } from "@/lib/getCurrentLocaleTranslation";
import { SignUpForm } from "@/components/auth/SignUpForm";

export async function generateMetadata() {
  const { t } = await getCurrentLocaleTranslation();
  return { title: t("auth.signUp.metaTitle") };
}

export default function SignUpPage() {
  return (
    <div className="mx-auto w-full max-w-sm px-6 py-16">
      <Suspense>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
