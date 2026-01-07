import { Outlet } from "react-router-dom";
import Sidebar from "../widgets/Sidebar";
import Topbar from "../widgets/topbar/Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-100">
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        <div className="grid grid-cols-[260px_1fr] gap-4">
          <Sidebar />
          <div className="flex flex-col gap-4">
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
