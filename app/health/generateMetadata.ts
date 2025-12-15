import type { Metadata } from "next";
import { buildMetadata } from "@/lib/seo";
import { getHealth } from "@/lib/health";

export async function generateMetadata(): Promise<Metadata> {
  let healthData = {
    status: "unhealthy",
    timestamp: new Date(),
  };

  try {
    const res = await getHealth();
    if (res) {
      healthData = res;
    }
  } catch (err) {
    console.warn("Failed to fetch health data for metadata:", err);
  }

  return buildMetadata({
    title: "Health Status",
    description: `Status: ${healthData.status}, Last Checked: ${new Date(
      healthData.timestamp
    ).toLocaleString()}`,
    url: "https://example.com/health",
  });
}
