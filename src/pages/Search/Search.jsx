/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { invoices } from "../Home/AssetTable";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { searchCoin } from "@/Redux/Coin/Action";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { IoMdArrowRoundBack } from "react-icons/io";
const SearchCoin = () => {
  const dispatch = useDispatch();
  const { asset, order, coin } = useSelector((store) => store);
  const [keyword, setKeyword] = useState("keyword");
  const navigate = useNavigate();

  const handleSearchCoin = () => {
    dispatch(searchCoin(keyword));
  };

  if (coin.loading) {
    return <SpinnerBackdrop />;
  }

  return (
    <div className="min-h-screen px-4 md:px-8 lg:px-12 py-8 max-w-6xl mx-auto mt-20">
      <div className="flex items-center justify-between gap-4 pb-8">
        {/* Back Button */}
        <div
          onClick={() => navigate("/")}
          className="p-2 cursor-pointer hover:bg-white/10 rounded-full transition-colors"
        >
          <IoMdArrowRoundBack className="text-white h-6 w-6" />
        </div>

        {/* Search Group */}
        <div className="flex flex-1 justify-center items-center max-w-xl mx-auto">
          <Input
            className="p-5 w-full max-w-[400px] lg:max-w-[500px] rounded-r-none border-r-0 focus-visible:ring-0"
            placeholder="explore market..."
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearchCoin()}
          />
          <Button
            onClick={handleSearchCoin}
            className="p-5 rounded-l-none border-l-0"
          >
            <SearchIcon className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <Table className="w-full border border-white/20 rounded-lg overflow-hidden">
        <TableHeader className="py-9 ">
          <TableRow className="sticky top-0 left-0 right-0 bg-background ">
            <TableHead className="py-3">Market Cap Rank</TableHead>
            <TableHead>COIN NAME</TableHead>

            <TableHead className="text-right">SYMBOL</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="">
          {coin.searchCoinList?.map((item) => (
            <TableRow
              onClick={() => navigate(`/market/${item.id}`)}
              key={item.id}
            >
              <TableCell>
                <p className="">{item.market_cap_rank}</p>
              </TableCell>
              <TableCell className="font-medium flex items-center gap-2">
                <Avatar className="-z-50">
                  <AvatarImage src={item.large} alt={""} />
                </Avatar>
                <span> {item.name}</span>
              </TableCell>

              <TableCell className="text-right">{item.symbol}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchCoin;
