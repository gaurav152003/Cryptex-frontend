/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { addItemToWatchlist, getUserWatchlist } from "@/Redux/Watchlist/Action";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useToast } from "@/components/ui/use-toast";

const Watchlist = () => {
  const dispatch = useDispatch();
  const { watchlist } = useSelector((store) => store);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    dispatch(getUserWatchlist());
  }, []);

  const handleRemove = (item) => {
    dispatch(addItemToWatchlist(item.id));

    toast({
      title: "Removed from Watchlist",
      description: `${item.name} removed successfully`,
      variant: "destructive",
    });
  };

  return (
    <div className="px-4 lg:px-12 py-6 text-white mt-20">
      {/* BACK */}
      <div onClick={() => navigate("/")} className="mb-6 cursor-pointer w-fit">
        <IoMdArrowRoundBack className="h-5 w-5 text-gray-300 hover:text-white" />
      </div>

      {/* HEADER */}
      <div className="flex items-center gap-4 mb-8">
        <BookmarkFilledIcon className="h-9 w-9 text-blue-500" />
        <h1 className="text-3xl font-semibold">Watchlist</h1>
      </div>

      {/* TABLE */}
      <div className="rounded-xl border border-white/10 bg-black">
        <ScrollArea className="h-[65vh]">
          <Table>
            <TableHeader className="sticky top-0 bg-black z-10">
              <TableRow className="border-b border-white/10">
                <TableHead>Coin</TableHead>
                <TableHead>Symbol</TableHead>
                <TableHead className="text-right">Volume</TableHead>
                <TableHead className="text-right">Market Cap</TableHead>
                <TableHead className="text-right">24H</TableHead>
                <TableHead className="text-right">High</TableHead>
                <TableHead className="text-right">Low</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Remove</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {watchlist.items?.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <TableCell
                    onClick={() => navigate(`/market/${item.id}`)}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={item.image} />
                    </Avatar>
                    <span className="font-medium">{item.name}</span>
                  </TableCell>

                  <TableCell className="uppercase text-gray-300">
                    {item.symbol}
                  </TableCell>

                  <TableCell className="text-right text-gray-300">
                    {item.total_volume.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right text-gray-300">
                    {item.market_cap.toLocaleString()}
                  </TableCell>

                  <TableCell
                    className={`text-right ${
                      item.market_cap_change_percentage_24h < 0
                        ? "text-red-500"
                        : "text-green-500"
                    }`}
                  >
                    {item.market_cap_change_percentage_24h.toFixed(2)}%
                  </TableCell>

                  <TableCell className="text-right text-green-500">
                    ${item.high_24h.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right text-red-500">
                    ${item.low_24h.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right font-medium">
                    ${item.current_price.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      onClick={() => handleRemove(item)}
                      variant="outline"
                      className="h-9 px-4 text-red-500 border-red-500/40 hover:bg-red-500/10"
                    >
                      Remove
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};

export default Watchlist;
