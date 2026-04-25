import React from "react";
import ReactApexChart from "react-apexcharts";
import { useMarketCoins } from "./useMarketCoin";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

/* ================= SMALL UI HELPERS ================= */

const ChartCard = ({ title, children }) => (
  <Card className="bg-black border border-white/10">
    <CardHeader>
      <CardTitle className="text-lg">{title}</CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

const MarketKpis = ({ topGainers, topLosers, mostBought }) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
    <StatCard
      title="Top Gainers"
      value={topGainers.length}
      color="text-green-400"
    />
    <StatCard
      title="Top Losers"
      value={topLosers.length}
      color="text-red-400"
    />
    <StatCard
      title="Most Bought"
      value={mostBought[0]?.symbol?.toUpperCase() || "-"}
      color="text-yellow-400"
    />
    <StatCard
      title="Highest Volume"
      value={
        mostBought[0] ? `$${mostBought[0].total_volume.toLocaleString()}` : "-"
      }
      color="text-blue-400"
    />
  </div>
);

const StatCard = ({ title, value, color }) => (
  <Card className="bg-black border border-white/10">
    <CardContent className="p-6">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </CardContent>
  </Card>
);

/* ================= MAIN COMPONENT ================= */

const AdminMarketOverview = () => {
  const { topGainers, topLosers, mostBought } = useMarketCoins();

  /* ---------- TOP GAINERS CHART ---------- */
  const gainersChart = {
    series: [
      {
        name: "24h Gain %",
        data: topGainers
          .slice(0, 10)
          .map((c) => Number(c.price_change_percentage_24h.toFixed(1))),
      },
    ],
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { borderRadius: 4 },
      },
      xaxis: {
        categories: topGainers.slice(0, 10).map((c) => c.symbol.toUpperCase()),
        labels: {
          style: { colors: "#94a3b8", fontSize: "12px" },
        },
      },
      yaxis: {
        labels: {
          formatter: (v) => `${v}%`,
          style: { colors: "#94a3b8" },
        },
      },
      grid: { borderColor: "#1f2937" },
      colors: ["#22c55e"],
      tooltip: {
        theme: "dark",
        y: { formatter: (v) => `${v}%` },
      },
    },
  };

  /* ---------- TOP LOSERS CHART ---------- */
  const losersChart = {
    series: [
      {
        name: "24h Loss %",
        data: topLosers
          .slice(0, 10)
          .map((c) =>
            Math.abs(Number(c.price_change_percentage_24h.toFixed(1))),
          ),
      },
    ],
    options: {
      chart: {
        type: "bar",
        background: "transparent",
        toolbar: { show: false },
      },
      plotOptions: {
        bar: { borderRadius: 4 },
      },
      xaxis: {
        categories: topLosers.slice(0, 10).map((c) => c.symbol.toUpperCase()),
        labels: {
          style: { colors: "#94a3b8", fontSize: "12px" },
        },
      },
      yaxis: {
        labels: {
          formatter: (v) => `-${v}%`,
          style: { colors: "#94a3b8" },
        },
      },
      grid: { borderColor: "#1f2937" },
      colors: ["#ef4444"],
      tooltip: {
        theme: "dark",
        y: { formatter: (v) => `-${v}%` },
      },
    },
  };

  return (
    <div className="space-y-12 mt-10">
      {/* 🔥 MARKET KPIs */}

      {/* 🔥 GAINERS / LOSERS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard title="Top Gainers (24h)">
          <ReactApexChart
            options={gainersChart.options}
            series={gainersChart.series}
            type="bar"
            height={280}
          />
        </ChartCard>

        <ChartCard title="Top Losers (24h)">
          <ReactApexChart
            options={losersChart.options}
            series={losersChart.series}
            type="bar"
            height={280}
          />
        </ChartCard>
      </div>

      {/* 🔥 MOST BOUGHT COINS */}
      <Card className="bg-black border border-white/10">
        <CardHeader>
          <CardTitle>Most Bought Coins (Volume)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {mostBought.slice(0, 5).map((coin) => (
            <div
              key={coin.id}
              className="flex justify-between items-center rounded-lg bg-white/5 px-4 py-2 hover:bg-white/10 transition"
            >
              <span className="font-medium">
                {coin.name} ({coin.symbol.toUpperCase()})
              </span>
              <span className="text-blue-400">
                Vol {coin.total_volume.toLocaleString()}
              </span>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminMarketOverview;
