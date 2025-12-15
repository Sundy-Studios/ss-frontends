import { Item } from "@/hooks/useCrud";
import { fetcher } from "./fetcher";

export async function getItemById(id: string) {
  return fetcher<Item>(`${process.env.NEXT_PUBLIC_API_BASE}/items/${id}`);
}
