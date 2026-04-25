/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const HeroSection = ({ scroll }) => {
  const { coin } = useSelector((store) => store);
  const btc = coin.coinDetails;
  const navigate = useNavigate();

  /* ---------------- GAINERS / LOSERS COUNT ---------------- */
  const stats = useMemo(() => {
    const coins = coin.coins || [];
    return {
      gainers: coins.filter((c) => c.price_change_percentage_24h > 0).length,
      losers: coins.filter((c) => c.price_change_percentage_24h < 0).length,
    };
  }, [coin.coins]);

  /* ---------------- TOP 4 COINS ---------------- */
  const topCoins = useMemo(() => {
    return (coin.coins || [])
      .sort((a, b) => b.market_cap - a.market_cap)
      .slice(0, 4);
  }, [coin.coins]);

  /* ---------------- MINI BTC CHART ---------------- */
  const chartSeries = [
    {
      name: "BTC",
      data:
        coin.marketChart?.data?.map((p) => ({
          x: p[0],
          y: p[1],
        })) || [],
    },
  ];

  const chartOptions = {
    chart: {
      type: "area",
      height: 160,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#22c55e"],
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.05,
      },
    },
    xaxis: {
      type: "datetime",
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: {
      labels: { show: false },
    },
    grid: { show: false },
    tooltip: { theme: "dark" },
  };

  return (
    <section className="relative overflow-hidden ">
      {/* BACKGROUND */}
      {/* MAIN GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black to-black" />

      {/* SOFT GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af,transparent_65%)] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-5 pt-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* ================= LEFT ================= */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 mb-4">
              <Zap className="w-4 h-4" />
              Live Crypto Market
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Trade Crypto with
              <span className="block bg-gradient-to-r  from-blue-400 to-blue-500 bg-clip-text text-transparent">
                Real-Time Intelligence
              </span>
            </h1>

            <p className="mt-5 text-gray-400 max-w-xl">
              Live prices, instant charts, top gainers & losers — all in one
              place.
            </p>

            <div className="mt-8 flex gap-4" onClick={() => scroll()}>
              <Button className="bg-blue-500 hover:bg-blue-400 text-black">
                Explore Market
              </Button>
            </div>

            <div className="mt-6 flex gap-6 text-sm">
              <p className="text-green-500">{stats.gainers} Gainers</p>
              <p className="text-red-500">{stats.losers} Losers</p>
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="space-y-6">
            {/* BTC CARD */}
            <div className="rounded-2xl border bg-background/60 backdrop-blur-xl p-5 shadow-xl">
              <div className="flex items-center gap-4">
                <img src={btc?.image?.large} alt="btc" className="w-12 h-12" />

                <div>
                  <p className="text-gray-400 text-sm">
                    {btc?.symbol?.toUpperCase()} • {btc?.name}
                  </p>
                  <p className="text-xl font-bold">
                    ${btc?.market_data?.current_price?.usd?.toLocaleString()}
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-1">
                  {btc?.market_data?.market_cap_change_percentage_24h >= 0 ? (
                    <TrendingUp className="text-green-500 w-4 h-4" />
                  ) : (
                    <TrendingDown className="text-red-500 w-4 h-4" />
                  )}
                  <span
                    className={`text-sm font-medium ${
                      btc?.market_data?.market_cap_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {btc?.market_data?.market_cap_change_percentage_24h?.toFixed(
                      2,
                    )}
                    %
                  </span>
                </div>
              </div>

              {/* MINI GRAPH */}
              <div className="mt-3" onClick={() => navigate(`/market/bitcoin`)}>
                <ReactApexChart
                  options={chartOptions}
                  series={chartSeries}
                  type="area"
                  height={160}
                />
              </div>
            </div>

            {/* TOP 4 COINS */}
            <div className="grid grid-cols-2 gap-4">
              {topCoins.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigate(`/market/${c.id}`)}
                  className="rounded-xl border bg-background/60 backdrop-blur-xl p-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.image} alt={c.name} className="w-8 h-8" />
                    <div>
                      <p className="text-sm font-medium">
                        {c.symbol.toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-400">
                        ${c.current_price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p
                    className={`mt-2 text-xs font-medium ${
                      c.price_change_percentage_24h >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {c.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                    {Math.abs(c.price_change_percentage_24h).toFixed(2)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
