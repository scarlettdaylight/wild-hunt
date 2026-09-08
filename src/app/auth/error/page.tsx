import Link from "next/link";

import { FormShell } from "@/components/form/FormShell";

export const metadata = { title: "Something went wrong · Wild Hunt" };

export default async function AuthErrorPage({
  searchParams,
}: PageProps<"/auth/error">) {
  const { error } = await searchParams;

  return (
    <FormShell
      title="Something went wrong"
      description={
        typeof error === "string" ? error : "An unspecified error occurred."
      }
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
