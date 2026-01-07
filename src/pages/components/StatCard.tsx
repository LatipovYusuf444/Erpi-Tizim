export default function StatCard({
  title,
  value,
  hint,
  badge,
}: {
  title: string;
  value: string;
  hint: string;
  badge: string;
}) {
  return (
    <section className="glass p-5">
      <div className="flex items-start justify-between">
        <div>
          <div className="font-semibold">{title}</div>
          <div className="text-xs text-slate-500">{hint}</div>
        </div>
        <span className="text-xs px-2 py-1 rounded-full bg-slate-900/5 border border-white/40">
          {badge}
        </span>
      </div>
      <div className="mt-4 text-2xl font-semibold">{value}</div>

      {/* TODO: backend data */}
    </section>
  );
}
