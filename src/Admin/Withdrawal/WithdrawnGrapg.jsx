import React from "react";
import { useSelector } from "react-redux";
import ReactApexChart from "react-apexcharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WithdrawalGraph = () => {
  const { withdrawal } = useSelector((store) => store);
  const requests = withdrawal.requests || [];

  // 🔥 real datetime series (NO FAKE DATA)
  const seriesData = requests.map((item) => ({
    x: new Date(item.date).getTime(),
    y: item.amount,
  }));

  const chart = {
    series: [
      {
        name: "Withdrawal Amount",
        data: seriesData,
      },
    ],
    options: {
      chart: {
        type: "area",
        toolbar: { show: false },
        zoom: { enabled: true },
      },

      xaxis: {
        type: "datetime",
        tickAmount: 6,
        labels: {
          style: { colors: "#94a3b8" },
        },
      },

      yaxis: {
        labels: {
          style: { colors: "#94a3b8" },
          formatter: (v) => `$${v.toFixed(1)}`, // ✅ only 1 decimal
        },
      },

      stroke: {
        curve: "smooth",
        width: 2,
      },

      colors: ["#ef4444"],

      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.4,
          opacityTo: 0.05,
          stops: [0, 100],
        },
      },

      tooltip: {
        theme: "dark",
        x: { format: "dd MMM yyyy" },
      },

      grid: {
        borderColor: "rgba(255,255,255,0.05)",
      },
    },
  };

  if (seriesData.length === 0) {
    return <p className="text-gray-400 p-6">No withdrawal data available</p>;
  }

  return (
    <Card className="bg-black border border-white/10">
      <CardHeader>
        <CardTitle>Withdrawal Amount Over Time</CardTitle>
      </CardHeader>
      <CardContent>
        <ReactApexChart
          options={chart.options}
          series={chart.series}
          type="area"
          height={220} // 🔥 compact
        />
      </CardContent>
    </Card>
  );
};

export default WithdrawalGraph;
