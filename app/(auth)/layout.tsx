import type { Metadata } from "next";
import PublicRoute from "@/components/PublicRoute";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Authentication",
  description: "Pages for user authentication",
});

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PublicRoute redirectTo="/">{children}</PublicRoute>;
}
