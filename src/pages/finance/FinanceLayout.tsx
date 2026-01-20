import { Outlet } from "react-router-dom";
import Navbar3 from "@/widgets/topbar_3/Topbar3";

export default function FinanceLayout() {
  return (
    <div className="mx-auto container">
      <Navbar3 />
      <div className="mt-4">
        <Outlet />
      </div>
    </div>
  );
}
