import { api } from "@/data/api";

export async function fetchOrders() {
  const res = await api.get("/api/v1/commerce/orders/");
  const data = res.data;
  return Array.isArray(data) ? data : (data.results ?? []);
}
