import { useMemo } from "react";
import { useSelector } from "react-redux";

export const useMarketCoins = () => {
  const { coins } = useSelector((store) => store.coin);

  const topGainers = useMemo(() => {
    return coins
      .filter((c) => c.price_change_percentage_24h > 0)
      .sort(
        (a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h,
      )
      .slice(0, 20);
  }, [coins]);

  const topLosers = useMemo(() => {
    return coins
      .filter((c) => c.price_change_percentage_24h < 0)
      .sort(
        (a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h,
      )
      .slice(0, 20);
  }, [coins]);

  const trending = useMemo(() => {
    return coins.slice(0, 20);
  }, [coins]);

  const mostBought = useMemo(() => {
    return [...coins]
      .sort((a, b) => b.total_volume - a.total_volume)
      .slice(0, 20);
  }, [coins]);

  return {
    coins,
    trending,
    topGainers,
    topLosers,
    mostBought,
  };
};
