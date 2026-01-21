  import { Outlet } from "react-router-dom";
import SotuvTabs from "@/pages/sotuv/SotuvTabs";

export default function SotuvLayout() {
  return (
    <div className="w-full">
      <SotuvTabs />
      <Outlet />
    </div>
  );
}
