import { Outlet } from "react-router-dom";
import Sidebar from "../widgets/Sidebar";
import Topbar from "../widgets/topbar/Topbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen w-full bg-slate-100">
      <div className="mx-auto max-w-[1400px] px-4 py-4">
        <div className="flex gap-4 group/sidebar">
          <Sidebar />

          <div className="flex min-w-0 flex-1 flex-col gap-4">
            <Topbar />

            {/* ✅ min-w-0 = flex ichida table/text buzilishini to‘xtatadi */}
            <main className="glass min-w-0 overflow-hidden p-4 md:p-6">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
