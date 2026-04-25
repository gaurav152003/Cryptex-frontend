import { fetchCryptoNews } from "@/Api/cryptoNewsApi";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "lucide-react";
import { IoMdArrowRoundBack } from "react-icons/io";

const MIN_WORDS = 300;
const MIN_DISPLAY_COUNT = 30;

const News = () => {
  const [news, setNews] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCryptoNews().then(setNews);
  }, []);

  /**
   * ✅ LOGIC:
   * 1. Apply search
   * 2. Separate long-form & short-form
   * 3. Show long-form first
   * 4. Fill remaining slots with short-form
   * 5. Always return at least 30 items (if available)
   */
  const filteredNews = useMemo(() => {
    const searched = news.filter((n) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        n.title?.toLowerCase().includes(q) || n.body?.toLowerCase().includes(q)
      );
    });

    const longForm = searched.filter(
      (n) =>
        typeof n.body === "string" && n.body.split(/\s+/).length >= MIN_WORDS,
    );

    const shortForm = searched.filter(
      (n) =>
        typeof n.body === "string" && n.body.split(/\s+/).length < MIN_WORDS,
    );

    return [...longForm, ...shortForm].slice(0, MIN_DISPLAY_COUNT);
  }, [news, search]);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-b  text-white px-4 md:px-8 mt-24 py-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate("/")}
          className="p-2 rounded-full  hover:bg-white/10 transition"
        >
          <IoMdArrowRoundBack className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-semibold">Latest News</h1>
      </div>

      {/* Search */}
      <div className="relative mb-10 max-w-xl">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 h-4 w-4" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search crypto news..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl
                     bg-black border border-white/20
                     text-white placeholder:text-gray-500
                     focus:outline-none focus:border-white/40"
        />
      </div>

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredNews.map((n, i) => {
          const wordCount = n.body?.split(/\s+/).length || 0;

          return (
            <div
              key={n.id || i}
              className="group relative isolate bg-black border border-white/15 rounded-2xl p-5
                         transition-all duration-300
                         hover:border-white/40
                         hover:-translate-y-1
                         hover:shadow-[0_0_40px_rgba(255,255,255,0.06)]
                         cursor-pointer"
              onClick={() => {
                (navigate("/news-details", { state: n }), scrollToTop());
              }}
            >
              <img
                src={n.imageurl || "/news-placeholder.jpg"}
                alt={n.title}
                className="w-full h-40 object-cover"
              />
              {/* Title */}
              <h3 className="text-lg font-semibold text-white leading-snug line-clamp-2">
                {n.title}
              </h3>

              {/* Body (short in card) */}
              <p className="text-sm text-gray-400 leading-relaxed mt-3 line-clamp-3">
                {n.body}
              </p>

              {/* Meta */}
              <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
                <span>{wordCount} words</span>
                {wordCount >= MIN_WORDS && (
                  <span className="px-2 py-0.5 rounded-full border border-white/20 text-[10px]">
                    LONG READ
                  </span>
                )}
              </div>

              {/* Hover Preview */}
              <div
                className="pointer-events-none absolute z-50
                           left-1/2 bottom-full mb-4 w-[360px]
                           -translate-x-1/2
                           opacity-0 scale-95
                           group-hover:opacity-100 group-hover:scale-100
                           transition-all duration-200"
              >
                <div
                  className="rounded-xl border border-white/20
                                bg-black/95 backdrop-blur-xl
                                p-4 shadow-2xl"
                >
                  <p className="text-[11px] uppercase tracking-wider text-gray-500 mb-2">
                    Preview
                  </p>

                  <h4 className="text-sm font-semibold text-white line-clamp-1">
                    {n.title}
                  </h4>

                  <p className="mt-2 text-xs text-gray-400 line-clamp-5">
                    {n.body}
                  </p>

                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-[11px] text-gray-500">
                      {wordCount} words
                    </span>
                    <span className="text-xs text-blue-400">Open →</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty State */}
      {filteredNews.length === 0 && (
        <p className="text-center text-gray-400 mt-14">No crypto news found.</p>
      )}
    </div>
  );
};

export default News;
