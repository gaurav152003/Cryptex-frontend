import { Star } from "lucide-react";

const reviews = [
  {
    name: "Rahul Sharma",
    role: "Crypto Trader",
    rating: 4,
    review:
      "The live charts and real-time prices are extremely accurate. Portfolio tracking makes everything easy.",
  },
  {
    name: "Amit Patel",
    role: "Day Trader",
    rating: 4,
    review:
      "Top gainers/losers and live news help me take quick decisions. Very useful platform.",
  },
  {
    name: "Sneha Iyer",
    role: "Crypto Enthusiast",
    rating: 5,
    review:
      "Wallet-to-wallet transfer and watchlist features are smooth. Perfect for beginners.",
  },
  {
    name: "Karan Mehta",
    role: "Long-Term Investor",
    rating: 4,
    review:
      "Secure login with 2FA and account verification gives confidence. Great experience overall.",
  },
  {
    name: "Pooja Singh",
    role: "Beginner Trader",
    rating: 5,
    review:
      "The AI chatbot helped me understand crypto basics instantly. Highly recommended!",
  },
];

const ReviewDemo = () => {
  return (
    <section className="border-t border-white/10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Our Users Say
          </h2>
          <p className="mt-3 text-gray-400">
            Trusted by traders and investors for real-time insights and
            security.
          </p>
        </div>

        {/* REVIEWS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 ">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl p-6
                         hover:border-blue-500/40 transition"
            >
              {/* STARS */}
              <div className="flex gap-1 mb-3">
                {[...Array(r.rating)].map((_, idx) => (
                  <Star
                    key={idx}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
              </div>

              {/* REVIEW */}
              <p className="text-sm text-gray-300 mb-4">“{r.review}”</p>

              {/* USER */}
              <div className="border-t border-white/10 pt-3">
                <p className="font-semibold text-white">{r.name}</p>
                <p className="text-xs text-gray-400">{r.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewDemo;
