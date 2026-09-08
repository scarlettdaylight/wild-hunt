import Link from "next/link";

import { FormShell } from "@/components/form/FormShell";

export const metadata = { title: "Confirm your email · Wild Hunt" };

export default function CheckEmailPage() {
  return (
    <FormShell
      title="Check your email"
      description="We sent you a confirmation link. Click it to activate your account, then sign in."
    >
      <Link
        href="/auth/login"
        className="mt-6 inline-block text-sm underline underline-offset-4"
      >
        Back to sign in
      </Link>
    </FormShell>
  );
}
