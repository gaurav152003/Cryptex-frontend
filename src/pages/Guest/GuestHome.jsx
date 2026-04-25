/* eslint-disable no-unused-vars */
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { TrendingUp, TrendingDown, Layers, Trophy } from "lucide-react";

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

import MarketHighlights from "../Home/MarketHighlight";
import FeaturesSection from "../Home/Feature";
import Footer from "../Home/Footer";
import HomeNewsSection from "../Home/HomeNewsSection";

import { MdArrowBack } from "react-icons/md";
import GuestNavbar from "./GuestNavbar";
import GuestHeroSection from "./GuestHero";
import { GuestAssetTable } from "./GuestAssetTable";
import GuestHomeNewsSection from "./GuestNews";
import GuestFooter from "./GuestFooter";
import GuestFeaturesSection from "./GuestFeature";
import GuestReviewsSection from "./GuestReview";

const GuestHome = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [category, setCategory] = useState("all");
  const { coin, auth } = useSelector((store) => store);
  const marketRef = useRef(null);

  /* Load Coins */
  useEffect(() => {
    dispatch(fetchCoinList(page));
    dispatch(fetchCoins());
  }, [page]);

  /* Default Coin */
  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: "bitcoin",
        jwt: null,
      }),
    );
  }, []);

  const scrollToMarket = () => {
    if (marketRef.current) {
      const y =
        marketRef.current.getBoundingClientRect().top +
        window.pageYOffset -
        100;

      window.scrollTo({ top: y, behavior: "smooth" });
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
    if (category === "top50") dispatch(getTop50CoinList());
    else if (category === "topGainers") dispatch(getTopGainers());
    else if (category === "topLoser") dispatch(getTopLosers());
  }, [dispatch, category]);

  if (coin.loading) return <SpinnerBackdrop />;

  return (
    <>
      {/* NAVBAR */}
      <GuestNavbar />

      {/* HERO */}
      <section className="pt-24 border-b mx-8">
        <GuestHeroSection scroll={scrollToMarket} />
        <MarketHighlights
          top50={coin.coins}
          topGainers={topGainers}
          topLosers={topLosers}
        />

        <div className="text-center max-w-3xl mx-auto py-10">
          <h1 className="text-4xl md:text-5xl font-bold text-white">
            Explore Market
          </h1>
          <p className="mt-2 text-gray-400 text-lg">
            Real-time prices, trends & insights
          </p>
        </div>
      </section>

      {/* MARKET */}
      <section ref={marketRef} className="scroll-mt-28">
        <div className="lg:flex mx-8">
          {/* LEFT */}
          <div className="lg:w-[100%]">
            <div className="py-4 flex gap-3">
              <Button
                variant={category === "all" ? "default" : "outline"}
                onClick={() => {
                  setCategory("all");
                  scrollToMarket();
                }}
              >
                <Layers className="w-4 h-4 mr-1" /> All
              </Button>

              <Button
                variant={category === "top50" ? "default" : "outline"}
                onClick={() => {
                  (setCategory("top50"), scrollToMarket());
                }}
              >
                <Trophy className="w-4 h-4 mr-1 text-blue-500" /> Top 50
              </Button>

              <Button
                variant={category === "topGainers" ? "default" : "outline"}
                onClick={() => setCategory("topGainers")}
              >
                <TrendingUp className="w-4 h-4 mr-1 text-green-500" /> Gainers
              </Button>

              <Button
                variant={category === "topLoser" ? "default" : "outline"}
                onClick={() => setCategory("topLoser")}
              >
                <TrendingDown className="w-4 h-4 mr-1 text-red-500" /> Losers
              </Button>
            </div>

            <GuestAssetTable
              key={category}
              category={category}
              coins={
                category === "all"
                  ? coin.coinList
                  : category === "top50"
                    ? coin.top50
                    : category === "topGainers"
                      ? topGainers
                      : topLosers
              }
            />

            {category === "all" && (
              <Pagination className="border-t py-3">
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      variant="ghost"
                      disabled={page === 1}
                      onClick={() => setPage(page - 1)}
                    >
                      <MdArrowBack />
                    </Button>
                  </PaginationItem>

                  {[1, 2, 3].map((p) => (
                    <PaginationItem key={p}>
                      <PaginationLink
                        isActive={page === p}
                        onClick={() => setPage(p)}
                      >
                        {p}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>

                  <PaginationItem>
                    <PaginationNext onClick={() => setPage(page + 1)} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>

          {/* RIGHT */}
          {/* <div className="hidden lg:block lg:w-[40%] ml-5">
            <StockChart coinId="bitcoin" />
          </div> */}
        </div>
      </section>

      {/* EXTRA */}
      <section className="border-t mx-8 mt-10">
        <GuestFeaturesSection />
      </section>

      <section className="border-t">
        <GuestHomeNewsSection />
      </section>
      <section>
        <GuestReviewsSection />
      </section>

      <GuestFooter scroll={scrollToMarket} />
    </>
  );
};

export default GuestHome;
