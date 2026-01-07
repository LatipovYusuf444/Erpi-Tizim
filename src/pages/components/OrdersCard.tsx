export default function OrdersCard() {
  return (
    <section className="glass-strong p-6 min-h-[260px] flex items-center justify-between gap-6">
      <div className="space-y-4">
        <div>
          <div className="text-xl font-semibold">Congratulations Jonathan</div>
          <div className="text-slate-500 text-sm">You have done 38% more sales</div>
        </div>

        <div className="space-y-3">
          <Item label="64 new orders" sub="Processing" />
          <Item label="4 orders" sub="On hold" />
          <Item label="12 orders" sub="Delivered" />
        </div>

        {/* TODO: backend stats shu yerga keladi */}
      </div>

      <div className="hidden md:block">
        <div className="h-44 w-56 rounded-2xl bg-gradient-to-br from-blue-500/20 to-slate-900/5 border border-white/40" />
      </div>
    </section>
  );
}

function Item({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-2xl bg-slate-900/5" />
      <div>
        <div className="font-semibold">{label}</div>
        <div className="text-sm text-slate-500">{sub}</div>
      </div>
    </div>
  );
}
