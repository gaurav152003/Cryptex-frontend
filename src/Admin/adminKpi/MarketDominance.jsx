import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";
import { useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MarketDominance = () => {
  const { coins = [] } = useSelector((s) => s.coin);

  /* ================= PREPARE DATA ================= */

  const { series, labels } = useMemo(() => {
    if (!coins.length) return { series: [], labels: [] };

    // Sort by market cap (desc)
    const sorted = [...coins]
      .filter((c) => typeof c.market_cap === "number")
      .sort((a, b) => b.market_cap - a.market_cap);

    // Take top 5 coins
    const topCoins = sorted.slice(0, 5);
    const topCapSum = topCoins.reduce((sum, c) => sum + c.market_cap, 0);

    const totalMarketCap = sorted.reduce((sum, c) => sum + c.market_cap, 0);

    const othersCap = Math.max(totalMarketCap - topCapSum, 0);

    return {
      series: [...topCoins.map((c) => c.market_cap), othersCap],
      labels: [...topCoins.map((c) => c.symbol.toUpperCase()), "Others"],
    };
  }, [coins]);

  /* ================= APEX CONFIG ================= */

  const chart = {
    series,
    options: {
      chart: {
        type: "donut",
        background: "transparent",
      },
      labels,
      legend: {
        position: "bottom",
        labels: { colors: "#9ca3af" },
      },
      stroke: {
        width: 1,
        colors: ["#000"],
      },
      colors: [
        "#f59e0b", // BTC-ish
        "#3b82f6", // ETH-ish
        "#22c55e",
        "#a855f7",
        "#ec4899",
        "#6b7280", // Others
      ],
      tooltip: {
        theme: "dark",
        y: {
          formatter: (val) => `$${val.toLocaleString()}`,
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            labels: {
              show: true,
              total: {
                show: true,
                label: "Market Cap",
                color: "#9ca3af",
                formatter: () =>
                  `$${series.reduce((a, b) => a + b, 0).toLocaleString()}`,
              },
            },
          },
        },
      },
    },
  };

  /* ================= UI ================= */

  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle>Market Dominance</CardTitle>
      </CardHeader>
      <CardContent>
        {series.length ? (
          <ReactApexChart
            options={chart.options}
            series={chart.series}
            type="donut"
            height={420}
          />
        ) : (
          <p className="text-gray-400 text-center py-20">
            Loading market data...
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default MarketDominance;
