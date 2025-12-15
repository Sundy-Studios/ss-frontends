import { HealthStatus } from "@/hooks/useHealth";
import { fetcher } from "./fetcher";

export async function getHealth() {
  return fetcher<HealthStatus>(`${process.env.NEXT_PUBLIC_API_BASE}/health`);
}
