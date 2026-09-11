import Link from "next/link";

import { FormShell } from "@/components/form/FormShell";
import { ROUTES } from "@/lib/routes";

export const metadata = { title: "Something went wrong · Wild Hunt" };

export default async function AuthErrorPage({
  searchParams,
}: PageProps<"/error">) {
  const { error } = await searchParams;

  return (
    <FormShell
      title="Something went wrong"
      description={
        typeof error === "string" ? error : "An unspecified error occurred."
      }
    >
      <Link
        href={ROUTES.login}
        className="mt-6 inline-block text-sm underline underline-offset-4"
      >
        Back to sign in
      </Link>
    </FormShell>
  );
}
