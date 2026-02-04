export type UiState = "loading" | "empty" | "error" | "content";

type Props = {
  state: UiState
  onChange: (s: UiState) => void
}


const btnBase = "rounded-md px-3 py-1.5 text-xs font-medium border transition";
const active = "bg-orange-500 text-white border-orange-500";
const idle = "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"

export default function DashboardStateBar({ state, onChange }: Props) {
  const items: { key: UiState; label: string }[] = [
    { key: "loading", label: "Show Loading" },
    { key: "empty", label: "Show Empty" },
    { key: "error", label: "Show Error" },
    { key: "content", label: "Show Content" },
  ]
  return (
    <div className="flex flex-wrap gap-2">
      {items.map((i) => (
        <button
          key={i.key}
          className={`${btnBase} ${state === i.key ? active : idle}`}
          onClick={() => onChange(i.key)}
          type="button"
        >
          {i.label}
        </button>
      ))}
    </div>
  )

}

