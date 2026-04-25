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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserAssets } from "@/Redux/Assets/Action";
import { getAllOrdersForUser } from "@/Redux/Order/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { calculateProfite } from "@/Util/calculateProfite";
import { readableDate } from "@/Util/readableDate";

const TreadingHistory = () => {
  const dispatch = useDispatch();
  const { order } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getUserAssets(localStorage.getItem("jwt")));
    dispatch(getAllOrdersForUser({ jwt: localStorage.getItem("jwt") }));
  }, []);

  return (
    <div className="rounded-xl border border-white/10 bg-black">
      <ScrollArea className="h-[65vh]">
        <Table>
          {/* HEADER */}
          <TableHeader className="sticky top-0 bg-black z-10">
            <TableRow className="border-b border-white/10">
              <TableHead>Date & Time</TableHead>
              <TableHead>Coin</TableHead>
              <TableHead className="text-right">Buy Price</TableHead>
              <TableHead className="text-right">Sell Price</TableHead>
              <TableHead className="text-center">Order</TableHead>
              <TableHead className="text-right">Profit / Loss</TableHead>
              <TableHead className="text-right">Value</TableHead>
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {[...(order.orders || [])]
              .sort(
                (a, b) =>
                  new Date(b.timestamp).getTime() -
                  new Date(a.timestamp).getTime(),
              )
              .map((item) => {
                const profit = calculateProfite(item);

                return (
                  <TableRow
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    {/* DATE */}
                    <TableCell>
                      <p className="font-medium">
                        {readableDate(item.timestamp).date}
                      </p>
                      <p className="text-xs text-gray-400">
                        {readableDate(item.timestamp).time}
                      </p>
                    </TableCell>

                    {/* COIN */}
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-7 w-7">
                        <AvatarImage
                          src={item.orderItem.coin.image}
                          alt={item.orderItem.coin.symbol}
                        />
                      </Avatar>
                      <span className="font-medium">
                        {item.orderItem.coin.name}
                      </span>
                    </TableCell>

                    {/* BUY */}
                    <TableCell className="text-right">
                      ${item.orderItem.buyPrice.toLocaleString()}
                    </TableCell>

                    {/* SELL */}
                    <TableCell className="text-right">
                      {item.orderItem.sellPrice
                        ? `$${item.orderItem.sellPrice.toLocaleString()}`
                        : "-"}
                    </TableCell>

                    {/* ORDER TYPE */}
                    <TableCell className="text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          item.orderType === "BUY"
                            ? "bg-green-500/10 text-green-500"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {item.orderType}
                      </span>
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
                      {item.orderType === "SELL"
                        ? `$${profit.toFixed(2)}`
                        : "-"}
                    </TableCell>

                    {/* VALUE */}
                    <TableCell className="text-right font-medium">
                      ${item.price.toLocaleString()}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
};

export default TreadingHistory;
