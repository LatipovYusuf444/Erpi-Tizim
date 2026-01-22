"use client"

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
    type ChartConfig,
} from "@/components/ui/chart"
import { cn } from "@/lib/utils"
import { useCashFlowChart } from "@/hooks/useKirimChiqimChart"

const formatSum = (n: number) => new Intl.NumberFormat("ru-RU").format(n)

const chartConfig = {
    kirim: { label: "Kirim", color: "var(--chart-1)" },
    chiqim: { label: "Chiqim", color: "var(--chart-2)" },
} satisfies ChartConfig

export default function Topbar4Top() {
    const { data, isLoading, isError } = useCashFlowChart()

    const chartData =
        (data ?? []).map((p) => ({
            day: p.day,
            kirim: p.kirim,
            chiqim: p.chiqim,
        })) ?? []
    const jsDay = new Date().getDay()
    const todayIndex = jsDay === 0 ? Math.max(0, chartData.length - 1) : Math.min(jsDay - 1, Math.max(0, chartData.length - 1))

    const today = chartData[todayIndex]
    const todayKirim = today?.kirim ?? 0
    const todayChiqim = today?.chiqim ?? 0

    const diff = todayKirim - todayChiqim
    const diffGood = diff >= 0

    return (
        <Card className="bg-[#EBF0FA] border border-[#6049E3] rounded-2xl">
            <CardHeader className="pb-2">
                {/* 1-qator: Title + Bugun */}
                <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                        <CardTitle className="text-[18px] leading-tight">
                            Kirim / Chiqim
                        </CardTitle>
                    </div>

                    <div className="text-sm text-slate-600 whitespace-nowrap">
                        Bugun
                    </div>
                </div>

                {/* 2-qator: Kirim / Chiqim */}
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-[14px] font-semibold tabular-nums">
                    <div className="whitespace-nowrap">
                        Kirim: <span className="font-bold">{formatSum(todayKirim)}</span>
                    </div>
                    <div className="whitespace-nowrap">
                        Chiqim: <span className="font-bold">{formatSum(todayChiqim)}</span>
                    </div>
                </div>

                {/* 3-qator: Description + Farq */}
                <div className="flex items-center justify-between gap-3">
                    <CardDescription className="text-slate-600">
                        Haftalik dinamika
                    </CardDescription>

                    <div
                        className={cn(
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap tabular-nums",
                            diffGood ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                        )}
                    >
                        Farq: {diffGood ? "+" : "-"}
                        {formatSum(Math.abs(diff))}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-2">
                {isLoading && (
                    <div className="h-55 rounded-xl bg-white/60 animate-pulse" />
                )}

                {isError && (
                    <div className="h-55 flex items-center justify-center text-sm text-red-600">
                        Chart data olishda xatolik
                    </div>
                )}

                {!isLoading && !isError && (
                    <ChartContainer config={chartConfig} className="h-57.5 pb-5 w-full">
                        <AreaChart
                            data={chartData}
                            margin={{ left: 8, right: 8, top: 10, bottom: 22 }}
                        >
                            <defs>
                                <linearGradient id="fillKirim" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-kirim)" stopOpacity={0.35} />
                                    <stop offset="95%" stopColor="var(--color-kirim)" stopOpacity={0.02} />
                                </linearGradient>
                                <linearGradient id="fillChiqim" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="var(--color-chiqim)" stopOpacity={0.25} />
                                    <stop offset="95%" stopColor="var(--color-chiqim)" stopOpacity={0.02} />
                                </linearGradient>
                            </defs>

                            <CartesianGrid vertical={false} strokeDasharray="3 3" />

                            <XAxis
                                dataKey="day"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                height={28}
                                tickFormatter={(v) => String(v).slice(0, 3)}
                            />

                            <YAxis
                                width={42}
                                tickLine={false}
                                axisLine={false}
                                tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
                            />

                            <ChartTooltip
                                cursor={false}
                                content={
                                    <ChartTooltipContent
                                        formatter={(value, name) => {
                                            const label = name === "kirim" ? "Kirim" : "Chiqim"
                                            return `${label}: ${formatSum(Number(value))}`
                                        }}
                                    />
                                }
                            />

                            <Area
                                dataKey="kirim"
                                type="monotone"
                                stroke="var(--color-kirim)"
                                strokeWidth={2.4}
                                fill="url(#fillKirim)"
                                dot={false}
                                activeDot={{ r: 5 }}
                            />

                            <Area
                                dataKey="chiqim"
                                type="monotone"
                                stroke="var(--color-chiqim)"
                                strokeWidth={2.2}
                                fill="url(#fillChiqim)"
                                dot={false}
                                activeDot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
