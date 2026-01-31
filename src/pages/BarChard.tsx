import { useEffect, useRef } from "react";
import * as echarts from "echarts";
import { useTranslation } from "react-i18next";

type BarItem = {
  key: "kassa" | "confirmed" | "debt";
  value: number;
};

type FrameData = Record<string, BarItem[]>;

export default function BarRaceChart() {
  const { t, i18n } = useTranslation();
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = echarts.init(chartRef.current);

    const frames: FrameData = {
      "2023": [
        { key: "kassa", value: 87_000 },
        { key: "confirmed", value: 32_000 },
        { key: "debt", value: 65_000 },
      ],
      "2024": [
        { key: "kassa", value: 110_000 },
        { key: "confirmed", value: 58_000 },
        { key: "debt", value: 44_000 },
      ],
      "2025": [
        { key: "kassa", value: 64_000 },
        { key: "confirmed", value: 85_000 },
        { key: "debt", value: 25_000 },
      ],
    };

    const years = Object.keys(frames);
    let index = 0;

    const numberFmt = new Intl.NumberFormat(
      i18n.language === "ru" ? "ru-RU" : "uz-UZ",
    );

    const render = (year: string) => {
      const sorted = [...frames[year]].sort((a, b) => a.value - b.value);

      chart.setOption({
        title: {
          text: `${t("barRace.titleYear")}: ${year}`,
          left: "center",
        },
        grid: { left: 120, right: 40, top: 60, bottom: 20 },
        xAxis: {
          type: "value",
          axisLabel: { formatter: (v: number) => numberFmt.format(v) },
        },
        yAxis: {
          type: "category",
          inverse: true,
          data: sorted.map((i) => t(`barRace.${i.key}`)),
          axisLabel: { fontSize: 13 },
        },
        series: [
          {
            type: "bar",
            data: sorted.map((i) => i.value),
            barWidth: 24,
            label: {
              show: true,
              position: "right",
              formatter: ({ value }) => numberFmt.format(value as number),
            },
          },
        ],
        animationDuration: 0,
        animationDurationUpdate: 900,
        animationEasing: "linear",
      });
    };

    render(years[index]);

    const timer = setInterval(() => {
      index = (index + 1) % years.length;
      render(years[index]);
    }, 3000);

    const onResize = () => chart.resize();
    window.addEventListener("resize", onResize);

    const rerender = () => render(years[index]);
    i18n.on("languageChanged", rerender);

    return () => {
      clearInterval(timer);
      window.removeEventListener("resize", onResize);
      i18n.off("languageChanged", rerender);
      chart.dispose();
    };
  }, [t, i18n]);

  return (
    <div ref={chartRef} className="max-w-[1200px]" style={{ height: 420 }} />
  );
}
