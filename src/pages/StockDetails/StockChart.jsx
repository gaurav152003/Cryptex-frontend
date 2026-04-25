import { useEffect, useMemo, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchMarketChart } from "@/Redux/Coin/Action";

const timeSeries = [
  { lable: "1 Day", value: 1 },
  { lable: "1 Week", value: 7 },
  { lable: "1 Month", value: 30 },
  { lable: "3 Month", value: 90 },
  { lable: "6 Month", value: 180 },
  { lable: "1 Year", value: 365 },
];

const StockChart = ({ coinId }) => {
  const dispatch = useDispatch();
  const { coin, auth } = useSelector((store) => store);

  const [activeType, setActiveType] = useState(timeSeries[0]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!coinId) return;

    dispatch(
      fetchMarketChart({
        coinId,
        days: activeType.value,
        jwt: localStorage.getItem("jwt") || auth.jwt,
      }),
    );
  }, [coinId, activeType.value]);

  /* ================= SERIES ================= */
  const series = useMemo(() => {
    return [
      {
        name: "Price",
        data: coin.marketChart?.data || [],
      },
    ];
  }, [coin.marketChart?.data]);

  /* ================= MARKET TREND ================= */
  const isMarketUp = useMemo(() => {
    if (!coin.marketChart?.data || coin.marketChart.data.length < 2)
      return true;

    const first = coin.marketChart.data[0][1];
    const last = coin.marketChart.data[coin.marketChart.data.length - 1][1];

    return last >= first;
  }, [coin.marketChart?.data]);

  const trendColor = isMarketUp ? "#22c55e" : "#ef4444";

  /* ================= CHART OPTIONS ================= */
  const options = useMemo(
    () => ({
      chart: {
        id: "area-datetime",
        type: "area",
        height: 450,
        background: "transparent",
        foreColor: "#cbd5e1",
        toolbar: {
          show: true,
        },
        zoom: {
          autoScaleYaxis: true,
        },
      },

      theme: {
        mode: "dark",
      },

      dataLabels: {
        enabled: false,
      },

      xaxis: {
        type: "datetime",
        tickAmount: 6,
        axisBorder: { show: false },
        axisTicks: { show: false },
        labels: {
          style: {
            colors: "#94a3b8",
            fontSize: "12px",
          },
        },
      },

      yaxis: {
        labels: {
          formatter: (value) => value.toFixed(1),
          style: {
            colors: isMarketUp ? "#94a3b8" : "#fca5a5",
          },
        },
      },

      grid: {
        borderColor: "rgba(148,163,184,0.15)",
        strokeDashArray: 4,
      },

      colors: [trendColor],

      stroke: {
        curve: "smooth",
        width: 2,
      },

      markers: {
        size: 0,
      },

      tooltip: {
        theme: "dark",
        x: {
          format: "dd MMM yyyy HH:mm",
        },
      },

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.35,
          opacityTo: 0.05,
          stops: [0, 100],
          colorStops: [
            {
              offset: 0,
              color: trendColor,
              opacity: 0.4,
            },
            {
              offset: 100,
              color: trendColor,
              opacity: 0.05,
            },
          ],
        },
      },
    }),
    [isMarketUp],
  );

  /* ================= LOADING ================= */
  if (coin.marketChart?.loading) {
    return (
      <div className="flex items-center justify-center h-[450px]">
        <div className="w-10 h-10 border-4 border-gray-700 border-t-gray-300 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div>
      {/* ===== TIME RANGE BUTTONS ===== */}
      <div className="flex gap-2 mb-6">
        {timeSeries.map((item) => (
          <Button
            key={item.lable}
            onClick={() => setActiveType(item)}
            variant={activeType.lable === item.lable ? "" : "outline"}
          >
            {item.lable}
          </Button>
        ))}
      </div>

      {/* ===== CHART ===== */}
      <ReactApexChart
        options={options}
        series={series}
        type="area"
        height={450}
      />
    </div>
  );
};

export default StockChart;
