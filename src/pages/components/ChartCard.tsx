export default function ChartCard() {
  return (
    <section className="glass-strong p-6">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-semibold">Total Orders</div>
          <div className="text-sm text-slate-500">Weekly order updates</div>
        </div>

        <button className="text-sm px-3 py-2 rounded-xl bg-slate-900/5 hover:bg-slate-900/10">
          March 2025 ▾
        </button>
      </div>

      <div className="mt-6 h-56 rounded-2xl bg-white/40 border border-white/40 backdrop-blur-xl grid place-items-center text-slate-500">
        Chart placeholder
        {/* TODO: chart lib ulaysiz (recharts / chart.js) va backenddan data */}
      </div>
    </section>
  );
}
