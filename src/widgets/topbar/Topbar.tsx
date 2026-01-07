import { Bell, Globe, Moon, Grid2X2, MessageSquareText } from "lucide-react";

export default function Topbar() {
  return (
    <header className="glass-strong px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <button className="h-10 w-10 rounded-xl bg-slate-900/5 hover:bg-slate-900/10" aria-label="Menu">
          ☰
        </button>

        <div className="hidden md:flex items-center gap-2 rounded-xl bg-white/60 border border-white/50 px-3 py-2 backdrop-blur-xl">
          <span className="text-slate-500 text-sm">Try to Searching...</span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <IconBtn><Globe size={18} /></IconBtn>
        <IconBtn><Moon size={18} /></IconBtn>
        <IconBtn><MessageSquareText size={18} /></IconBtn>
        <IconBtn><Grid2X2 size={18} /></IconBtn>
        <IconBtn><Bell size={18} /></IconBtn>

        <div className="flex items-center gap-3 rounded-xl px-2 py-1 hover:bg-slate-900/5">
          <div className="h-9 w-9 rounded-2xl bg-slate-900/10" />
          <div className="leading-4 hidden sm:block">
            <div className="text-sm font-semibold">Mike Nielsen</div>
            <div className="text-xs text-slate-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button className="h-10 w-10 rounded-xl bg-slate-900/5 hover:bg-slate-900/10 grid place-items-center">
      {children}
    </button>
  );
}
