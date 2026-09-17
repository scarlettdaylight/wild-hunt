import { SiteHeader } from "@/components/SiteHeader";

/** Public chrome: a header across the top, content beneath it. */
export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
