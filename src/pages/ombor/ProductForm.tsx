import { useState } from "react";
import SotuvQoshishModal, { type Option } from "@/pages/ombor/ProductQoshishModal";

export default function ProductForm() {
  const [open, setOpen] = useState(true);

  // demo options (keyin backenddan keladi)
  const tovarlar: Option[] = [
    { value: "1", label: "Vilka" },
    { value: "2", label: "Tarelka" },
    { value: "3", label: "Paket" },
  ];

  const omborlar: Option[] = [
    { value: "A", label: "New Rar" },
    { value: "B", label: "Kill bite" },
  ];

  const tolovTurlari: Option[] = [
    { value: "cash", label: "Naqd" },
    { value: "card", label: "Karta" },
    { value: "bank", label: "Bank" },
  ];

  return (
    <div className="p-6">
      <SotuvQoshishModal
        open={open}
        onOpenChange={setOpen}
        tovarlar={tovarlar}
        omborlar={omborlar}
        tolovTurlari={tolovTurlari}
        redirectTo="/ombor/inventarizatsiya"
      />
    </div>
  );
}
