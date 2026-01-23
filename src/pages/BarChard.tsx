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
        { name: "Kassa", value: 87_000 },
        { name: "Tasdiqlangan", value: 32_000 },
        { name: "Qarzdorlik", value: 65_000 },
      ],
      "2024": [
        { name: "Kassa", value: 110_000 },
        { name: " Tasdiqlangan", value: 58_000 },
        { name: "Qarzdorlik", value: 44_000 },
      ],
      "2025": [
        { name: "Kassa", value: 64_000 },
        { name: "Tasdiqlangan", value: 85_000 },
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
        animationDurationUpdate: 900,
        animationEasing: "linear",
      });
    };

    render(keys[index]);

    const timer = setInterval(() => {
      index = (index + 1) % keys.length;
      render(keys[index]);
    }, 3000);

    window.addEventListener("resize", chart.resize);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", chart.resize);
      chart.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} className="max-w-[1200px]" style={{ height: 420 }} />
  );
}
