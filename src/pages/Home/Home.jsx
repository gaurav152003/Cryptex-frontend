/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import { AssetTable } from "./AssetTable";
import { Button } from "@/components/ui/button";
import StockChart from "../StockDetails/StockChart";
import { useDispatch, useSelector } from "react-redux";
import { MdArrowBack } from "react-icons/md";
import { TrendingUp } from "lucide-react";
import { TrendingDown } from "lucide-react";
import { Layers } from "lucide-react";
import { Trophy } from "lucide-react";

import {
  fetchCoinDetails,
  fetchCoinList,
  fetchCoins,
  getTop50CoinList,
  getTopGainers,
  getTopLosers,
} from "@/Redux/Coin/Action";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from "@/components/ui/pagination";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import HeroSection from "./HeroSection";
import MarketHighlights from "./MarketHighlight";
import FeaturesSection from "./Feature";
import Footer from "./Footer";
import ReviewsSection from "./HomeNewsSection";
import HomeNewsSection from "./HomeNewsSection";
import ReviewDemo from "./Reviewsdemo";

const Home = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const { coin, auth } = useSelector((store) => store);
  const marketRef = useRef(null);
  /* ---------------- Load Coin List ---------------- */
  useEffect(() => {
    dispatch(fetchCoinList(page));
    dispatch(fetchCoins());
  }, [page]);

  /* ---------------- Load Default Coin ---------------- */
  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: "bitcoin",
        jwt: auth.jwt || localStorage.getItem("jwt"),
      }),
    );
  }, []);

  // custom coins

  const scrollToMarket = () => {
    if (marketRef.current) {
      const y =
        marketRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        100; // navbar offset

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  const topGainers = useMemo(() => {
    return (coin.coins || [])
      .filter((c) => c.price_change_percentage_24h > 0)
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
      )
      .slice(0, 20);
  }, [coin.coins]);

  const topLosers = useMemo(() => {
    return (coin.coins || [])
      .filter((c) => c.price_change_percentage_24h < 0)
      .sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
      )
      .slice(0, 20);
  }, [coin.coins]);

  useEffect(() => {
    if (category !== "all") {
      // wait for DOM update
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToMarket();
        }, 50);
      });
    }
  }, [category]);
  /* ---------------- Category Change ---------------- */
  useEffect(() => {
    if (category === "top50") {
      dispatch(getTop50CoinList());
    }
    // } else if (category == "topGainers") {
    //   dispatch(getTopGainers());
    // } else if (category == "topLoser") {
    //   dispatch(getTopLosers());
    // }
  }, [dispatch, category]);
  // console.log(dispatch(getTopLosers()));

  if (
    (category === "all" && coin.loading) ||
    (category === "topGainers" && coin.topGainerLoading) ||
    (category === "topLoser" && coin.topLoserLoading)
  ) {
    return <SpinnerBackdrop />;
  }

  return (
    <>
      <section className="border-b mt-10 ml-8 mr-8">
        <HeroSection scroll={scrollToMarket} />
        <MarketHighlights
          top50={coin.coins}
          topGainers={topGainers}
          topLosers={topLosers}
        />
        <div className="text-center max-w-3xl mx-auto py-10">
          {/* MAIN TITLE */}
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-white">
            Explore Market
          </h1>

          {/* SUBTITLE */}
          <p className="mt-2 text-[20px] text-gray-400">
            Real-time prices, market trends, and performance insights
          </p>

          {/* TAGLINE */}
        </div>
      </section>

      <section ref={marketRef} className="scroll-mt-28 ">
        <div className="relative">
          <div className="lg:flex">
            {/* LEFT SIDE */}

            <div className=" lg:w-[100%]  ml-8">
              <div className="py-4 px-2 flex gap-4 ">
                <Button
                  variant={category === "all" ? "default" : "outline"}
                  onClick={() => {
                    (setCategory("all"), scrollToMarket());
                  }}
                  className="rounded-md flex items-center gap-2"
                >
                  <Layers className="w-5 h-4 " />
                  <span> All</span>
                </Button>

                <Button
                  variant={category === "top50" ? "default" : "outline"}
                  onClick={() => {
                    (setCategory("top50"), scrollToMarket());
                  }}
                  className="rounded-md flex items-center gap-2"
                >
                  <Trophy className="w-5 h-4 text-blue-500" />
                  <span> Top 50</span>
                </Button>

                <Button
                  variant={category === "topGainers" ? "default" : "outline"}
                  onClick={() => {
                    (setCategory("topGainers"), scrollToMarket());
                  }}
                  className="rounded-md flex items-center gap-2"
                >
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <span>Top Gainers</span>
                </Button>

                <Button
                  variant={category === "topLoser" ? "default" : "outline"}
                  onClick={() => {
                    (fetchCoins(), setCategory("topLoser"), scrollToMarket());
                  }}
                  className="rounded-md flex items-center gap-2 "
                >
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <span> Top Losers</span>
                </Button>
              </div>

              <AssetTable
                key={category}
                category={category}
                coins={
                  category === "all"
                    ? coin.coinList
                    : category === "top50"
                      ? coin.top50
                      : category === "topGainers"
                        ? topGainers
                        : category === "topLoser"
                          ? topLosers
                          : []
                }
              />

              {category === "all" && (
                <Pagination className="border-t py-2">
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        variant="ghost"
                        disabled={page === 1}
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page - 1);
                          scrollToMarket(); // 🔥
                        }}
                      >
                        <MdArrowBack className="w-5 h-5" />
                      </Button>
                    </PaginationItem>

                    {[1, 2, 3].map((p) => (
                      <PaginationItem key={p}>
                        <PaginationLink
                          href="#"
                          isActive={page === p}
                          onClick={(e) => {
                            e.preventDefault();
                            setPage(p);
                            scrollToMarket(); // 🔥🔥🔥
                          }}
                        >
                          {p}
                        </PaginationLink>
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>

                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          setPage(page + 1);
                          scrollToMarket(); // 🔥
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </div>
            {/* RIGHT SIDE */}
            <div className="hidden lg:block lg:w-[55%] pt-[20px] pl-2 mr-5">
              <StockChart coinId="bitcoin" />

              <div className="flex gap-5 items-center mt-5">
                <img
                  src={coin.coinDetails?.image?.large}
                  alt="coin"
                  className="w-10 h-10"
                />

                <div>
                  <p className="text-gray-400">
                    {coin.coinDetails?.symbol?.toUpperCase()} •{" "}
                    {coin.coinDetails?.name}
                  </p>

                  <div className="flex items-end gap-3">
                    {/* Price */}
                    <p className="text-xl font-bold">
                      $
                      {coin.coinDetails?.market_data?.current_price?.usd?.toLocaleString()}
                    </p>

                    {/* 24h change */}
                    <p
                      className={`text-sm font-medium ${
                        coin.coinDetails?.market_data
                          ?.market_cap_change_percentage_24h < 0
                          ? "text-red-600"
                          : "text-green-600"
                      }`}
                    >
                      {coin.coinDetails?.market_data
                        ?.market_cap_change_percentage_24h < 0
                        ? "▼"
                        : "▲"}{" "}
                      {Math.abs(
                        coin.coinDetails?.market_data
                          ?.market_cap_change_percentage_24h,
                      ).toFixed(2)}
                      %
                    </p>
                  </div>

                  {/* Market cap change value (optional, smaller) */}
                  <p className="text-xs text-gray-500">
                    24h MC: $
                    {Math.abs(
                      coin.coinDetails?.market_data?.market_cap_change_24h,
                    )?.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="border-t border-white/20 ml-8 mr-8 mt-8">
        <FeaturesSection />
      </section>
      <section className="border-t ">
        <HomeNewsSection />
      </section>
      <section>
        <ReviewDemo />
      </section>
      <section className="border-t ">
        <Footer scroll={scrollToMarket} />
      </section>
    </>
  );
};

export default Home;
