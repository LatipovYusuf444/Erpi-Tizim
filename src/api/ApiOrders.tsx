import { api } from "@/api/api";

export type ApiOrderRow = {
  id: number;
  client_name: string;
  product_title: string;
  created_at: string;
  item_quantity: number;
  item_price: number;
  nds_percent: number;
  price_with_nds: number;
  total_price: number;
};

export async function fetchOrders(): Promise<ApiOrderRow[]> {
  const res = await api.get("api/v1/commerce/orders_report/");
  const data = res.data;
  console.log(res.data);

  return Array.isArray(data) ? data : (data.results ?? []);
}
