import { useState } from "react";
import RightDrawer from "./SotuvQoshishRight";
import SalesCreateForm from "./SalesCreateForm";

export default function SalesList() {
  const [open, setOpen] = useState(false);

  return (
    <div className="">
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 rounded-lg w-[120px] text-[18px] cursor-pointer text-white bg-gradient-to-r from-[#1C96C8] to-[#334F9D]"
      >
        Add
      </button>

      <RightDrawer
        open={open}
        onClose={() => setOpen(false)}
        title="Yangi sotuv qo‘shish"
      >
        <SalesCreateForm onClose={() => setOpen(false)} />
      </RightDrawer>
    </div>
  );
}
