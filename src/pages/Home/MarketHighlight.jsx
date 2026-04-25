/* eslint-disable no-unused-vars */
import { TrendingUp, TrendingDown, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MarketHighlights = ({ top50 = [], topGainers = [], topLosers = [] }) => {
  // Always show only 4
  const t50 = top50.slice(0, 4);
  const gainers = topGainers.slice(0, 4);
  const losers = topLosers.slice(0, 4);
  const navigate = useNavigate();
  const Box = ({ title, icon: Icon, data, color }) => (
    <div className="rounded-2xl border bg-background/60 backdrop-blur-xl p-5">
      <div className="flex items-center gap-2 mb-4">
        <Icon className={`w-5 h-5 ${color}`} />
        <h3 className="font-semibold">{title}</h3>
      </div>

      {data.length === 0 ? (
        <p className="text-sm text-gray-400">No data</p>
      ) : (
        <div className="space-y-3">
          {data.map((c) => (
            <div
              key={c.id}
              className="flex items-center justify-between text-sm"
            >
              <div
                className="flex items-center gap-3"
                onClick={() => navigate(`/market/${c.id}`)}
              >
                <img src={c.image} className="w-6 h-6" />
                <span className="font-medium">{c.symbol?.toUpperCase()}</span>
              </div>

              <div className="text-right">
                <p>${c.current_price?.toLocaleString()}</p>
                <p
                  className={`text-xs ${
                    c.price_change_percentage_24h >= 0
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {c.price_change_percentage_24h >= 0 ? "▲" : "▼"}{" "}
                  {Math.abs(c.price_change_percentage_24h).toFixed(2)}%
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <section className="max-w-7xl mx-auto px-6 py-10 cursor-pointer">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Box
          title="Top 50 Coins"
          icon={Trophy}
          data={t50}
          color="text-blue-500"
        />
        <Box
          title="Top Gainers"
          icon={TrendingUp}
          data={gainers}
          color="text-green-500"
        />
        <Box
          title="Top Losers"
          icon={TrendingDown}
          data={losers}
          color="text-red-500"
        />
      </div>
    </section>
  );
};

export default MarketHighlights;
