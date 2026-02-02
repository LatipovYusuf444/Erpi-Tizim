import { api } from "@/api/api";

export async function fetchOrders() {
  const res = await api.get("api/v1/commerce/orders_report");
  const data = res.data;
  return Array.isArray(data) ? data : (data.results ?? []);
}
