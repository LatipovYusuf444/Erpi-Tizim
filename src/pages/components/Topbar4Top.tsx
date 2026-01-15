"use client"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"
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
export const description = "A line chart"
const chartData = [
    { month: "Dushanba", desktop: 90 },
    { month: "Seshanba", desktop: 110 },
    { month: "Chorshanba", desktop: 120 },
    { month: "Payshanba", desktop: 110 },
    { month: "Juma", desktop: 100 },
    { month: "Shanba", desktop: 130 },
]
const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "var(--chart-1)",
    },
} satisfies ChartConfig


export default function Topbar4Top() {
    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Kirim chiqim</CardTitle>
                    <CardDescription>Bugungi</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                            margin={{
                                left: 12,
                                top:-20,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Line
                                dataKey="desktop"
                                type="natural"
                                stroke="var(--color-desktop)"
                                strokeWidth={2}
                                dot={false}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
