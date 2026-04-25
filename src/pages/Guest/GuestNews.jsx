import { useEffect, useState } from "react";
import { fetchCryptoNews } from "@/Api/cryptoNewsApi";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const GuestHomeNewsSection = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchCryptoNews().then((data) => {
      setNews(data.slice(0, 3)); // 🔥 only 5 news
    });
  }, []);
  const handleclick = () => {
    alert("please login first");
  };

  return (
    <section className="border-t border-white/10 py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              Latest Crypto News
            </h2>
            <p className="text-gray-400 mt-2">
              Stay updated with real-time crypto market news
            </p>
          </div>

          <div onClick={handleclick}>
            <Button variant="outline" className="mt-4 md:mt-0">
              See More
            </Button>
          </div>
        </div>

        {/* NEWS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((n) => (
            <div
              key={n.id}
              className="cursor-pointer rounded-2xl border border-white/10 bg-background/60 backdrop-blur-xl overflow-hidden hover:border-blue-500/40 transition"
            >
              {/* IMAGE */}
              <img
                src={n.imageurl || "/news-placeholder.jpg"}
                alt={n.title}
                className="w-full h-40 object-cover"
              />

              {/* CONTENT */}
              <div className="p-4">
                <p className="text-xs text-blue-400 mb-1">{n.source}</p>

                <h3 className="font-semibold text-white text-sm line-clamp-2">
                  {n.title}
                </h3>

                <p className="text-xs text-gray-400 mt-2 line-clamp-3">
                  {n.body}
                </p>

                <p className="text-xs text-gray-500 mt-3">
                  {new Date(n.published_on * 1000).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuestHomeNewsSection;
