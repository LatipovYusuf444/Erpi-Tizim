import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Bell, Globe, Moon, Grid2X2, MessageSquareText, Search } from "lucide-react";

/**
 * Topbar (1ga1)
 * - 1-qator: uzun gradient search pill + o'ngda iconlar
 * - 2-qator: pill tabs (NavLink) -> pagega o'tadi
 *
 * Kerakli:
 * - react-router-dom (NavLink)
 * - lucide-react
 * - Tailwind
 */

// 👉 PATH'larni sizning routeringizga moslab qo'ying
const tabs = [
  { label: "Kassa", to: "/kassa" },
  { label: "Kunlik yopish", to: "/kunlik-yopish" },
  { label: "Qarzdorlik", to: "/qarzdorlik" },
] as const;


export default function Topbar() {
  const { pathname } = useLocation();

  return (
    <header className="glass-strong px-4 py-3 rounded-3xl">
      {/* 1-qator */}
      <div className="flex items-center gap-3">
        {/* Burger */}
        <button
          type="button"
          className="h-10 w-10 rounded-2xl bg-slate-900/5 hover:bg-slate-900/10 grid place-items-center"
          aria-label="Menu"
        >
          ☰
        </button>

        {/* Search pill (rasmga o'xshash) */}
        <div className="flex-1 min-w-0">
          <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#1C96C8] to-[#334F9D] shadow-[0_12px_26px_rgba(51,79,157,0.30)]">
            <div className="relative rounded-3xl bg-white/70 backdrop-blur-xl border border-white/50">
              <input
                className={[
                  "w-full h-10 rounded-3xl",
                  "bg-transparent",
                  "pl-4 pr-10",
                  "outline-none",
                  "placeholder:text-slate-500 text-sm",
                ].join(" ")}
                placeholder="Qidiruv..."
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500">
                <Search size={18} />
              </div>
            </div>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <IconBtn><Globe size={18} /></IconBtn>
          <IconBtn><Moon size={18} /></IconBtn>
          <IconBtn><MessageSquareText size={18} /></IconBtn>
          <IconBtn><Grid2X2 size={18} /></IconBtn>
          <IconBtn><Bell size={18} /></IconBtn>

          {/* Profile (rasmda kichik bo'ladi) */}
          <Link to="/profile" className="flex items-center gap-3 rounded-2xl px-2 py-1 hover:bg-slate-900/5">
            <div className="h-9 w-9 rounded-2xl bg-slate-900/10" />
            <div className="leading-4 hidden sm:block">
              <div className="text-sm font-semibold">Yusuf</div>
              <div className="text-xs text-slate-500">Admin</div>
            </div>
          </Link>
        </div>
      </div>

      {/* 2-qator: Tabs (NavLink) */}
      {/* <div className="mt-3">
        <div className="rounded-3xl p-[2px] bg-gradient-to-r from-[#1C96C8] to-[#334F9D] shadow-[0_12px_26px_rgba(51,79,157,0.22)]">
          <nav
            className={[
              "h-10 w-full rounded-3xl",
              "bg-white/70 backdrop-blur-xl border border-white/50",
              "px-2",
              "flex items-center gap-2",
              "overflow-x-auto",
            ].join(" ")}
            aria-label="Topbar tabs"
          >
            {tabs.map((t) => (
              <TabLink
                key={t.to}
                to={t.to}
                label={t.label}
                // agar nested route bo'lsa ham active bo'lishi uchun:
                active={pathname.startsWith(t.to)}
              />
            ))}
          </nav>
        </div>
      </div> */}
    </header>
  );
}

/** Icon button (o'ngdagi iconlar) */
function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      type="button"
      className="h-10 w-10 rounded-2xl bg-slate-900/5 hover:bg-slate-900/10 grid place-items-center"
    >
      {children}
    </button>
  );
}

/** NavLink tab (bosganda pagega o'tadi) */
function TabLink({
  to,
  label,
  active,
}: {
  to: string;
  label: string;
  active: boolean;
}) {
  return (
    <NavLink
      to={to}
      className={[
        "whitespace-nowrap",
        "h-8 px-4 rounded-2xl text-sm font-medium",
        "flex items-center",
        "transition-all duration-200",
        active
          ? "bg-white shadow-[0_10px_22px_rgba(15,23,42,0.10)] text-slate-900"
          : "text-slate-700 hover:bg-white/60",
      ].join(" ")}
    >
      {label}
    </NavLink>
  );
}
