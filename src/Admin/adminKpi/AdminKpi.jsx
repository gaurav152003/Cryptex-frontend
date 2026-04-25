import { useSelector } from "react-redux";
import { Card, CardContent } from "@/components/ui/card";

const Stat = ({ label, value, color = "text-white" }) => (
  <Card className="bg-black border border-white/10">
    <CardContent className="p-6">
      <p className="text-sm text-gray-400">{label}</p>
      <p className={`text-3xl font-bold ${color}`}>{value}</p>
    </CardContent>
  </Card>
);

const AdminKpis = () => {
  const { coin, users, withdrawal } = useSelector((store) => store);

  const coins = coin.coins || [];

  /* ===== GAINERS / LOSERS ===== */
  const gainers = coins.filter(
    (c) =>
      typeof c.price_change_percentage_24h === "number" &&
      c.price_change_percentage_24h > 0,
  );

  const losers = coins.filter(
    (c) =>
      typeof c.price_change_percentage_24h === "number" &&
      c.price_change_percentage_24h < 0,
  );

  /* ===== MOST BOUGHT & HIGHEST VOLUME ===== */
  const mostBoughtCoin = [...coins]
    .filter((c) => typeof c.total_volume === "number")
    .sort((a, b) => b.total_volume - a.total_volume)[0];

  const highestVolume = mostBoughtCoin?.total_volume || 0;

  /* ===== TOTAL WITHDRAWN ===== */
  const totalWithdrawn = (withdrawal.requests || []).reduce(
    (sum, w) => sum + (w.amount || 0),
    0,
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6">
      <Stat
        label="Gainers (24h)"
        value={gainers.length}
        color="text-green-400 text-[22px] "
      />

      <Stat
        label="Losers (24h)"
        value={losers.length}
        color="text-red-400 text-[22px] "
      />

      <Stat
        label="Most Bought"
        value={mostBoughtCoin?.symbol?.toUpperCase() || "-"}
        color="text-yellow-400 text-[22px] "
      />

      <Stat
        label="Highest Volume"
        value={`$${highestVolume.toLocaleString()}`}
        color="text-blue-400 text-[22px] "
      />
      <Stat
        label="Total Withdrawn"
        value={`$${totalWithdrawn.toLocaleString()}`}
        color="text-yellow-400 text-[22px] "
      />
    </div>
  );
};

export default AdminKpis;
