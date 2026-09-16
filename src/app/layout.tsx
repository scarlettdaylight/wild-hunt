import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Wild Hunt",
  description: "Track the job hunt.",
};

/**
 * The document shell, and nothing else. The header belongs to each route group's
 * layout rather than here, so the signed-in sidebar can run the full height of
 * the window with the header beside it instead of above it.
 */
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
