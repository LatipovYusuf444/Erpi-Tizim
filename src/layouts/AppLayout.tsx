import { Outlet } from "react-router-dom";
import Sidebar from "../widgets/Sidebar";
import Topbar from "../widgets/topbar/Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-100">
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        {/* ✅ group/sidebar: hover bo'lsa sidebar + layout birga ishlaydi */}
        <div className="flex gap-4 group/sidebar">
          <Sidebar />
          {/* ✅ flex-1: sidebar kengaysa main ham yon tomonga suriladi */}
          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <Topbar />
            <main className="glass p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
