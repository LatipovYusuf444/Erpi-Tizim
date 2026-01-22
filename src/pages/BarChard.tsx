import { useEffect, useRef } from "react";
import * as echarts from "echarts";

type BarItem = {
  name: string;
  value: number;
};

type FrameData = Record<string, BarItem[]>;

export default function BarRaceChart() {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    // 🔹 DATA (key = frame / year / month)
    const frames: FrameData = {
      "2023": [
        { name: "Kassa", value: 80_000 },
        { name: "Tasdiqlangan", value: 30_000 },
        { name: "Qarzdorlik", value: 60_000 },
      ],
      "2024": [
        { name: "Kassa", value: 100_000 },
        { name: " Tasdiqlangan", value: 50_000 },
        { name: "Qarzdorlik", value: 40_000 },
      ],
      "2025": [
        { name: "Kassa", value: 160_000 },
        { name: "Tasdiqlangan", value: 110_000 },
        { name: "Qarzdorlik", value: 25_000 },
      ],
    };

    const keys = Object.keys(frames);
    let index = 0;

    const render = (key: string) => {
      const sorted = [...frames[key]].sort((a, b) => a.value - b.value);

      chart.setOption({
        title: {
          text: `Yil: ${key}`,
          left: "center",
        },
        grid: {
          left: 120,
          right: 40,
          top: 60,
          bottom: 20,
        },
        xAxis: {
          type: "value",
          axisLabel: {
            formatter: (v: number) => new Intl.NumberFormat("ru-RU").format(v),
          },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: sorted.map((i) => i.name),
          axisLabel: {
            fontSize: 13,
          },
        },
        series: [
          {
            type: "bar",
            data: sorted.map((i) => i.value),
            barWidth: 24,
            label: {
              show: true,
              position: "right",
              formatter: ({ value }) =>
                new Intl.NumberFormat("ru-RU").format(value as number),
            },
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 1000,
        animationEasing: "linear",
      });
    };

    render(keys[index]);

    const timer = setInterval(() => {
      index = (index + 1) % keys.length;
      render(keys[index]);
    }, 2000);

    window.addEventListener("resize", chart.resize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", chart.resize);
      chart.dispose();
    };
  }, []);

  return <div ref={chartRef} className="w-full" style={{ height: 420 }} />;
}
