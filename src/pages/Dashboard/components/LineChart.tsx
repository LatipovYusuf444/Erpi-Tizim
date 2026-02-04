import React, { useMemo } from "react"

type Point = { label: string; value: number }

type Props = {
  data: Point[]
  height?: number
}

export default function LineChart({ data, height = 220 }: Props) {
  const width = 640
  const pad = 28

  const { points, minV, maxV } = useMemo(() => {
    const values = data.map((d) => d.value)
    const minV = Math.min(...values)
    const maxV = Math.max(...values)

    const xStep = (width - pad * 2) / Math.max(1, data.length - 1)
    const norm = (v: number) => {
      if (maxV === minV) return height / 2
      const t = (v - minV) / (maxV - minV)
      return height - pad - t * (height - pad * 2)
    }

    const pts = data.map((d, i) => {
      const x = pad + i * xStep
      const y = norm(d.value)
      return { x, y }
    })

    return { points: pts, minV, maxV }
  }, [data, height])

  const poly = points.map((p) => `${p.x},${p.y}`).join(" ")

  // simple y-axis ticks
  const ticks = 4
  const tickValues = Array.from({ length: ticks + 1 }, (_, i) => {
    const t = i / ticks
    const v = Math.round(minV + (maxV - minV) * (1 - t))
    const y = pad + t * (height - pad * 2)
    return { v, y }
  })

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-[220px]"
        role="img"
        aria-label="Sales chart"
      >
        {/* grid */}
        {tickValues.map((t, idx) => (
          <g key={idx}>
            <line
              x1={pad}
              x2={width - pad}
              y1={t.y}
              y2={t.y}
              stroke="rgba(15,23,42,0.08)"
              strokeWidth="1"
            />
            <text
              x={6}
              y={t.y + 4}
              fontSize="10"
              fill="rgba(15,23,42,0.55)"
              fontFamily="ui-sans-serif, system-ui"
            >
              {t.v}
            </text>
          </g>
        ))}

        {/* x labels */}
        {data.map((d, i) => {
          const xStep = (width - pad * 2) / Math.max(1, data.length - 1)
          const x = pad + i * xStep
          return (
            <text
              key={d.label}
              x={x}
              y={height - 8}
              fontSize="10"
              fill="rgba(15,23,42,0.55)"
              textAnchor="middle"
              fontFamily="ui-sans-serif, system-ui"
            >
              {d.label}
            </text>
          )
        })}

        {/* line */}
        <polyline
          points={poly}
          fill="none"
          stroke="rgba(15,23,42,0.85)"
          strokeWidth="2.5"
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* points */}
        {points.map((p, idx) => (
          <circle
            key={idx}
            cx={p.x}
            cy={p.y}
            r="3.2"
            fill="white"
            stroke="rgba(15,23,42,0.85)"
            strokeWidth="2"
          />
        ))}
      </svg>
    </div>
  )
}
