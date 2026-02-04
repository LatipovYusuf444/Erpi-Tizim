import React from "react";

export type AdminRole = "superadmin" | "admin" | "none";

export function cx(...cls: Array<string | false | undefined | null>) {
  return cls.filter(Boolean).join(" ");
}

export function RoleBadge({ role }: { role: AdminRole | null }) {
  const r = (role ?? "none") as AdminRole;

  const map: Record<AdminRole, { label: string; cls: string }> = {
    superadmin: { label: "Super Admin", cls: "bg-fuchsia-500/12 text-fuchsia-200 ring-fuchsia-400/25" },
    admin: { label: "Admin", cls: "bg-emerald-500/12 text-emerald-200 ring-emerald-400/25" },
    none: { label: "—", cls: "bg-white/8 text-white/70 ring-white/15" },
  };

  return (
    <span className={cx("inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ring-1", map[r].cls)}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {map[r].label}
    </span>
  );
}

export function StatusSelect({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="relative w-[150px]">
      <select
        value={value ? "active" : "inactive"}
        onChange={(e) => onChange(e.target.value === "active")}
        className={cx(
          "w-full appearance-none rounded-xl border border-white/12 bg-white/5 px-3 py-2 text-sm",
          "text-white/90 outline-none backdrop-blur-xl",
          "focus:border-white/25 focus:ring-2 focus:ring-white/10 transition"
        )}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M7 10l5 5 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
}

export function IconButton({
  label,
  onClick,
  variant = "default",
}: {
  label: string;
  onClick: () => void;
  variant?: "default" | "danger";
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "inline-flex items-center justify-center rounded-lg px-2.5 py-2 text-xs font-semibold transition",
        "border border-white/12 bg-white/5 text-white/90 hover:bg-white/10 hover:border-white/20",
        "focus:outline-none focus:ring-2 focus:ring-white/10",
        variant === "danger" &&
          "text-rose-200 hover:text-rose-100 border-rose-400/20 bg-rose-500/8 hover:bg-rose-500/12 hover:border-rose-300/30"
      )}
      type="button"
      title={label}
      aria-label={label}
    >
      {label}
    </button>
  );
}

export function Modal({
  open,
  title,
  children,
  onClose,
}: {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/12 bg-[#0b0f1a]/90 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.85)]">
        <div className="flex items-center justify-between px-6 py-5">
          <h3 className="text-lg font-semibold text-white/90">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-white/70 hover:bg-white/10 hover:text-white/90 transition"
            type="button"
          >
            Yopish
          </button>
        </div>
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}

export function Toast({ msg, onClose }: { msg: string | null; onClose: () => void }) {
  if (!msg) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="rounded-2xl border border-white/12 bg-white/8 px-5 py-3 text-sm text-white/90 backdrop-blur-xl shadow-[0_18px_80px_-30px_rgba(0,0,0,0.8)]">
        <div className="flex items-center gap-3">
          <span className="h-2 w-2 rounded-full bg-emerald-400/90" />
          <span className="max-w-[320px]">{msg}</span>
          <button onClick={onClose} className="ml-2 text-white/60 hover:text-white/90" type="button">
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
