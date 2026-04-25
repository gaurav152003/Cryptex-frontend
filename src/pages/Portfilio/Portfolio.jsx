/* eslint-disable no-unused-vars */
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import TreadingHistory from "./TreadingHistory";
import { useNavigate } from "react-router-dom";
import MiniSparkline from "../Home/MinSparkline";
import { IoMdArrowRoundBack } from "react-icons/io";

const Portfolio = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentTab, setCurrentTab] = useState("portfolio");
  const { asset } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="px-4 lg:px-12 py-6 text-white mt-20">
      {/* BACK */}
      <div onClick={() => navigate("/")} className="mb-6 cursor-pointer w-fit">
        <IoMdArrowRoundBack className="h-5 w-5 text-gray-300 hover:text-white" />
      </div>

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold">Portfolio</h1>

        <Select onValueChange={setCurrentTab} defaultValue="portfolio">
          <SelectTrigger className="w-[180px] bg-black border border-white/10">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="portfolio">Portfolio</SelectItem>
            <SelectItem value="history">History</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* CONTENT */}
      {currentTab === "portfolio" ? (
        <div className="rounded-xl border border-white/10 bg-black">
          <ScrollArea className="h-[65vh]">
            <Table>
              {/* HEADER */}
              <TableHeader className="sticky top-0 bg-black z-10">
                <TableRow className="border-b border-white/10">
                  <TableHead>Coin</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Units</TableHead>
                  <TableHead className="text-right">Profit / Loss</TableHead>
                  <TableHead className="text-right">Change (%)</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Trend</TableHead>
                </TableRow>
              </TableHeader>

              {/* BODY */}
              <TableBody>
                {asset.userAssets?.map((item) => {
                  const profit =
                    (item.coin.current_price - item.buyPrice) * item.quantity;

                  return (
                    <TableRow
                      key={item.id}
                      onClick={() => navigate(`/market/${item.coin.id}`)}
                      className="border-b border-white/5 hover:bg-white/5 cursor-pointer transition"
                    >
                      {/* COIN */}
                      <TableCell className="flex items-center gap-3">
                        <Avatar className="h-7 w-7">
                          <AvatarImage src={item.coin.image} />
                        </Avatar>
                        <span className="font-medium">{item.coin.name}</span>
                      </TableCell>

                      {/* PRICE */}
                      <TableCell className="text-right">
                        ${item.coin.current_price.toLocaleString()}
                      </TableCell>

                      {/* UNITS */}
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>

                      {/* PROFIT / LOSS */}
                      <TableCell
                        className={`text-right font-medium ${
                          profit > 0
                            ? "text-green-500"
                            : profit < 0
                              ? "text-red-500"
                              : "text-gray-400"
                        }`}
                      >
                        ${profit.toFixed(2)}
                      </TableCell>

                      {/* CHANGE */}
                      <TableCell
                        className={`text-right ${
                          item.coin.price_change_percentage_24h < 0
                            ? "text-red-500"
                            : "text-green-500"
                        }`}
                      >
                        {item.coin.price_change_percentage_24h.toFixed(2)}%
                      </TableCell>

                      {/* VALUE */}
                      <TableCell className="text-right font-medium">
                        $
                        {(
                          item.coin.current_price * item.quantity
                        ).toLocaleString()}
                      </TableCell>

                      {/* TREND */}
                      <TableCell className="text-right">
                        <MiniSparkline
                          price={item.coin.current_price}
                          change={item.coin.price_change_percentage_24h}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      ) : (
        <TreadingHistory />
      )}
    </div>
  );
};

export default Portfolio;
