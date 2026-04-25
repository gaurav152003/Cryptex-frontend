import {
  ShieldCheck,
  UserCheck,
  Activity,
  LineChart,
  TrendingUp,
  TrendingDown,
  Wallet,
  ArrowLeftRight,
  Newspaper,
  Bot,
  Zap,
  Eye,
  ListChecks,
} from "lucide-react";

const features = [
  {
    icon: <ShieldCheck className="w-6 h-6 text-emerald-400" />,
    title: "Two-Factor Authentication (2FA)",
    desc: "Extra security layer to protect your account and transactions.",
  },
  {
    icon: <UserCheck className="w-6 h-6 text-blue-400" />,
    title: "Account Verification",
    desc: "Verified users for secure and trusted trading experience.",
  },
  {
    icon: <Activity className="w-6 h-6 text-cyan-400" />,
    title: "Live Market Data",
    desc: "Real-time crypto prices with instant market updates.",
  },
  {
    icon: <LineChart className="w-6 h-6 text-green-400" />,
    title: "Live Interactive Charts",
    desc: "Smooth charts with multiple timeframes and indicators.",
  },
  {
    icon: <TrendingUp className="w-6 h-6 text-green-500" />,
    title: "Top Gainers",
    desc: "Coins with the highest positive price movement.",
  },
  {
    icon: <TrendingDown className="w-6 h-6 text-red-400" />,
    title: "Top Losers",
    desc: "Cryptocurrencies with the biggest market drops.",
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-400" />,
    title: "Top 50 Cryptocurrencies",
    desc: "Market-cap based top 50 crypto assets list.",
  },
  {
    icon: <Wallet className="w-6 h-6 text-purple-400" />,
    title: "Portfolio Tracking",
    desc: "Track holdings, profits, and losses in one dashboard.",
  },
  {
    icon: <ArrowLeftRight className="w-6 h-6 text-indigo-400" />,
    title: "Wallet-to-Wallet Transfer",
    desc: "Fast and secure internal transfers between wallets.",
  },
  {
    icon: <Newspaper className="w-6 h-6 text-orange-400" />,
    title: "Live Crypto News",
    desc: "Real-time news from trusted crypto & finance sources.",
  },
  {
    icon: <Eye className="w-6 h-6 text-pink-400" />,
    title: "Watchlist",
    desc: "Save and monitor your favorite coins easily.",
  },
  {
    icon: <ListChecks className="w-6 h-6 text-sky-400" />,
    title: "Activity & Transaction History",
    desc: "Track login activity, transfers, and withdrawals.",
  },
];

const GuestFeaturesSection = () => {
  return (
    <section className="border-t border-white/10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Platform Features
          </h2>
          <p className="mt-3 text-gray-400">
            Everything you need for a secure, smart, and real-time crypto
            platform.
          </p>
        </div>

        {/* FEATURES GRID → 4 × 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl p-6
                         hover:border-emerald-500/40 transition"
            >
              <div className="mb-4">{f.icon}</div>
              <h3 className="font-semibold text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestFeaturesSection;
