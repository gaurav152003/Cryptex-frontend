// import { useEffect, useState } from "react";
// import ReactApexChart from "react-apexcharts";
// import fetchData, { dataType } from "../Home/fetchMarketData";
// import { convertToUnixTimestamp } from "./ConvertToChartData";

// const Chart = () => {
//   const [series, setSeries] = useState([]);

//   useEffect(() => {
//     const fetchStockData = async () => {
//       const data = await fetchData();
//       const chartData = convertToUnixTimestamp(data[dataType]);

//       // 👇 Proper datetime format for Apex
//       const formattedData = chartData.map((item) => ({
//         x: new Date(item.time).getTime(),
//         y: Number(item.close),
//       }));

//       setSeries([
//         {
//           name: "Price",
//           data: formattedData,
//         },
//       ]);
//     };

//     fetchStockData();
//   }, []);

//   const options = {
//     chart: {
//       type: "area",
//       height: 640,
//       background: "transparent",
//       toolbar: {
//         show: true,
//       },
//       zoom: {
//         enabled: true,
//       },
//     },

//     theme: {
//       mode: "dark",
//     },

//     dataLabels: {
//       enabled: false,
//     },

//     stroke: {
//       curve: "smooth",
//       width: 2,
//       colors: ["#94a3b8"],
//     },

//     fill: {
//       type: "gradient",
//       gradient: {
//         shadeIntensity: 1,
//         opacityFrom: 0.6,
//         opacityTo: 0.05,
//         stops: [0, 90, 100],
//       },
//     },

//     xaxis: {
//       type: "datetime",
//       labels: {
//         style: {
//           colors: "#64748b",
//         },
//       },
//     },

//     yaxis: {
//       labels: {
//         style: {
//           colors: "#64748b",
//         },
//       },
//       tooltip: {
//         enabled: true,
//       },
//     },

//     grid: {
//       borderColor: "#1f2937",
//       strokeDashArray: 4,
//     },

//     tooltip: {
//       theme: "dark",
//       x: {
//         format: "dd MMM HH:mm",
//       },
//     },
//   };

//   return (
//     <div className="w-full">
//       <ReactApexChart
//         options={options}
//         series={series}
//         type="area"
//         height={640}
//       />
//     </div>
//   );
// };

// export default Chart;
