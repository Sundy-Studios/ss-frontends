import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getItemById } from "@/lib/items";

interface PageProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  try {
    const item = await getItemById(params.id);

    return buildMetadata({
      title: item.name,
      description: `Location: ${item.location}, Date: ${new Date(
        item.date
      ).toLocaleDateString()}`,
      url: `https://example.com/items/${item.id}`,
    });
  } catch (err) {
    return buildMetadata({
      title: "Item not found",
      description: "This item could not be found",
    });
  }
}
