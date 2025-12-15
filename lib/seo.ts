import type { Metadata } from "next";

type BaseSeoProps = {
  title: string;
  description: string;
  url?: string;
  image?: string;
};

export function buildMetadata({
  title,
  description,
  url,
  image,
}: BaseSeoProps): Metadata {
  return {
    title,
    description,
    alternates: url
      ? {
          canonical: url,
        }
      : undefined,
    openGraph: {
      title,
      description,
      url,
      images: image ? [{ url: image }] : undefined,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
