import { z } from "zod";

const toNumber = (v: unknown) => {
  if (typeof v === "number") return v;
  if (typeof v !== "string") return NaN;
  const cleaned = v.replace(/\s/g, "").replace(",", ".");
  return Number(cleaned);
};

export const SaleSchema = z.object({
  client_name: z.string().min(1, "Mijoz tanlang"),
  from_station: z.string().min(1, "Shtab qattan tanlang"),
  to_station: z.string().min(1, "Shtab qayerga tanlang"),

  product_id: z.coerce.number().int().positive("Mahsulot tanlang"),

  quantity: z.preprocess(
    toNumber,
    z.number().positive("Miqdori 0 dan katta bo‘lsin"),
  ),
  nds_percent: z.preprocess(toNumber, z.number().min(0).max(100).default(0)),

  payment_type: z.enum(["cash", "card", "bank"]),
  date: z.string().min(1, "Sanani kiriting"), // YYYY-MM-DD
});

export type SaleFormValues = z.infer<typeof SaleSchema>;
