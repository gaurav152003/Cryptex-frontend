/* eslint-disable no-unused-vars */
/* eslint-disable no-constant-condition */

import { Button } from "@/components/ui/button";
import { IoMdArrowRoundBack } from "react-icons/io";
import {
  BookmarkFilledIcon,
  BookmarkIcon,
  DotIcon,
} from "@radix-ui/react-icons";
import StockChart from "./StockChart";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TreadingForm from "./TreadingForm";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails } from "@/Redux/Coin/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { existInWatchlist } from "@/Util/existInWatchlist";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { getUserWallet } from "@/Redux/Wallet/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { useToast } from "@/components/ui/use-toast";

const StockDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { coin, watchlist, auth } = useSelector((store) => store);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(
      fetchCoinDetails({
        coinId: id,
        jwt: auth.jwt || localStorage.getItem("jwt"),
      }),
    );
  }, [id]);

  useEffect(() => {
    dispatch(getUserWatchlist());
    dispatch(getUserWallet(localStorage.getItem("jwt")));
  }, []);

  const handleAddToWatchlist = () => {
    const alreadySaved = existInWatchlist(watchlist.items, coin.coinDetails);

    dispatch(addItemToWatchlist(coin.coinDetails?.id));

    toast({
      title: alreadySaved ? "Removed from Watchlist" : "Added to Watchlist",
      description: alreadySaved
        ? `${coin.coinDetails?.name} removed successfully`
        : `${coin.coinDetails?.name} saved to your watchlist`,
      variant: alreadySaved ? "destructive" : "success",
    });
  };

  if (coin.loading) return <SpinnerBackdrop />;

  return (
    <div className="p-5 mt-16">
      {/* BACK */}
      <div onClick={() => navigate("/")} className="mb-3 cursor-pointer">
        <IoMdArrowRoundBack className="text-white h-5 w-5" />
      </div>

      {/* HEADER */}
      <div className="flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <Avatar>
            <AvatarImage src={coin.coinDetails?.image?.large} />
          </Avatar>

          <div>
            <div className="flex items-center gap-2">
              <p className="font-medium">
                {coin.coinDetails?.symbol?.toUpperCase()}
              </p>
              <DotIcon className="text-gray-400" />
              <p className="text-gray-400">{coin.coinDetails?.name}</p>
            </div>

            <div className="flex items-end gap-2">
              <p className="text-xl font-bold">
                ${coin.coinDetails?.market_data.current_price.usd}
              </p>
              <p
                className={`text-sm ${
                  coin.coinDetails?.market_data.market_cap_change_24h < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {coin.coinDetails?.market_data.market_cap_change_percentage_24h}
                %
              </p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {/* WATCHLIST */}
          <Button
            onClick={handleAddToWatchlist}
            variant="outline"
            size="icon"
            className="h-10 w-10"
          >
            {existInWatchlist(watchlist.items, coin.coinDetails) ? (
              <BookmarkFilledIcon className="h-6 w-6" />
            ) : (
              <BookmarkIcon className="h-6 w-6" />
            )}
          </Button>

          {/* BUY / SELL */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600">
                Buy / Sell
              </Button>
            </DialogTrigger>
            <DialogContent className="border border-white/20 bg-black/60">
              <DialogHeader>
                <DialogTitle className="text-center pt-4">
                  How much do you want to spend?
                </DialogTitle>
              </DialogHeader>
              <TreadingForm setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* CHART */}
      <div className="mt-10">
        <StockChart coinId={coin.coinDetails?.id} />
      </div>
    </div>
  );
};

export default StockDetails;
