import { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: "View Items",
    description: "Pages for viewing all items paginated",
  });
}
