/* eslint-disable no-unused-vars */
import { useMemo } from "react";
import { TrendingUp, TrendingDown, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactApexChart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

const GuestHeroStatic = () => {
  const navigate = useNavigate();

  /* ---------------- STATIC BTC INFO ---------------- */
  const btc = {
    name: "Bitcoin",
    symbol: "BTC",
    price: 71328,
    change: 3.47,
    image: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  };

  /* ---------------- STATIC STATS ---------------- */
  const stats = {
    gainers: 174,
    losers: 65,
  };

  /* ---------------- STATIC TOP COINS ---------------- */
  const topCoins = [
    {
      id: "btc",
      name: "Bitcoin",
      symbol: "BTC",
      price: 71265,
      change: 3.36,
      image: btc.image,
    },
    {
      id: "eth",
      name: "Ethereum",
      symbol: "ETH",
      price: 2120.6,
      change: 3.96,
      image: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
    },
    {
      id: "usdt",
      name: "Tether",
      symbol: "USDT",
      price: 0.999,
      change: 0.02,
      image: "https://assets.coingecko.com/coins/images/325/large/Tether.png",
    },
    {
      id: "xrp",
      name: "XRP",
      symbol: "XRP",
      price: 1.46,
      change: 4.14,
      image:
        "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
    },
  ];

  /* ---------------- STATIC BTC CHART DATA ---------------- */
  const chartSeries = useMemo(() => {
    const now = Date.now();
    let price = 68000;

    return [
      {
        name: "BTC",
        data: Array.from({ length: 140 }).map((_, i) => {
          // 🔥 volatility + upward bias
          const pump = i > 100 ? Math.random() * 300 : 0;
          price += Math.random() * 250 - 120 + pump;

          return {
            x: now - (139 - i) * 5 * 60 * 1000,
            y: Math.round(price),
          };
        }),
      },
    ];
  }, []);

  const chartOptions = {
    chart: {
      type: "area",
      toolbar: { show: false },
      zoom: { enabled: false },
      animations: { enabled: false },
      background: "transparent",
    },

    stroke: {
      curve: "smooth",
      width: 4, // 🔥 THICK LINE
    },

    colors: ["#00ff88"], // 🚨 CRAZY NEON GREEN

    grid: {
      show: false,
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

    tooltip: {
      theme: "dark",
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 1.5, // 🔥 DARK FILL
        opacityTo: 0.9,
        stops: [0, 100],
      },
    },

    markers: {
      size: 0,
    },
  };
  return (
    <section className="relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-[#020617] to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#1e40af,transparent_65%)] opacity-40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT */}
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 text-xs rounded-full bg-blue-500/10 text-blue-400 mb-4">
              <Zap className="w-4 h-4" />
              Live Crypto Market
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Trade Crypto with
              <span className="block text-blue-500">
                Real-Time Intelligence
              </span>
            </h1>

            <p className="mt-5 text-gray-400 max-w-xl">
              Live prices, instant charts, top gainers & losers — all in one
              place.
            </p>

            <Button
              className="mt-8 bg-blue-500 hover:bg-blue-400 text-black"
              onClick={() => navigate("/signin")}
            >
              Get Started
            </Button>

            <div className="mt-6 flex gap-6 text-sm">
              <p className="text-green-500">{stats.gainers} Gainers</p>
              <p className="text-red-500">{stats.losers} Losers</p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-6">
            {/* BTC MAIN CARD */}
            <div className="rounded-2xl border border-white/10 bg-black p-5 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <img src={btc.image} className="w-10 h-10" />
                  <div>
                    <p className="text-sm text-gray-400">BTC • Bitcoin</p>
                    <p className="text-2xl font-bold">
                      ${btc.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                <p className="text-green-500 font-medium">↗ {btc.change}%</p>
              </div>

              <ReactApexChart
                options={chartOptions}
                series={chartSeries}
                type="line"
                height={260}
              />
            </div>

            {/* SMALL COIN CARDS */}
            <div className="grid grid-cols-2 gap-4">
              {topCoins.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-white/10 bg-black p-4"
                >
                  <div className="flex items-center gap-3">
                    <img src={c.image} className="w-8 h-8" />
                    <div>
                      <p className="text-sm font-medium">{c.symbol}</p>
                      <p className="text-xs text-gray-400">${c.price}</p>
                    </div>
                  </div>

                  <p className="mt-2 text-xs text-green-500">▲ {c.change}%</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuestHeroStatic;
