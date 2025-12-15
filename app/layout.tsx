import type { Metadata } from "next";
import Providers from "./providers";
import NavBar from "@/components/navbar";
import { buildMetadata } from "@/lib/seo";
import PageContainer from "@/components/PageContainer";

export const metadata: Metadata = buildMetadata({
  title: "My App",
  description: "My application description",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <NavBar />
          <PageContainer>{children}</PageContainer>
        </Providers>
      </body>
    </html>
  );
}
