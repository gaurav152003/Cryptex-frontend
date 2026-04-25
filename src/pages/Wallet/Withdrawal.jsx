/* eslint-disable no-unused-vars */
import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const Withdrawal = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  const navigate = useNavigate();

  const sortedHistory = [...(withdrawal.history || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  useEffect(() => {
    dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
  }, []);

  return (
    <div className="px-4 lg:px-12 py-6 text-white mt-20">
      {/* BACK */}
      <div onClick={() => navigate("/")} className="mb-6 cursor-pointer w-fit">
        <IoMdArrowRoundBack className="h-5 w-5 text-gray-300 hover:text-white" />
      </div>

      {/* HEADER */}
      <h1 className="text-3xl font-semibold mb-6">Withdrawals</h1>

      {/* TABLE CARD */}
      <Card className="bg-black border border-white/10">
        <CardHeader>
          <CardTitle className="text-xl">Withdrawal History</CardTitle>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[60vh]">
            <Table>
              {/* TABLE HEADER */}
              <TableHeader className="sticky top-0 bg-black z-10">
                <TableRow className="border-b border-white/10">
                  <TableHead>Date</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>

              {/* TABLE BODY */}
              <TableBody>
                {sortedHistory?.map((item) => (
                  <TableRow
                    key={item.id}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    {/* DATE */}
                    <TableCell className="font-medium">
                      {readableTimestamp(item?.date)}
                    </TableCell>

                    {/* METHOD */}
                    <TableCell className="text-gray-300">
                      Bank Account
                    </TableCell>

                    {/* AMOUNT */}
                    <TableCell className="text-right font-medium">
                      ${item.amount.toLocaleString()}
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="text-right">
                      <Badge
                        className={`px-3 py-1 ${
                          item.status === "PENDING"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {item.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default Withdrawal;
// import { getWithdrawalHistory } from "@/Redux/Withdrawal/Action";
// import { readableDate } from "@/Util/readableDate";
// import { readableTimestamp } from "@/Util/readbaleTimestamp";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const Withdrawal = () => {
//   const dispatch = useDispatch();

//   const { withdrawal } = useSelector((store) => store);

//   useEffect(() => {
//     dispatch(getWithdrawalHistory(localStorage.getItem("jwt")));
//   }, []);

//   return (
//     <div className="px-20 ">
//       <h1 className="text-3xl font-bold py-10">Withdrawal</h1>
//       <div>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead className="py-5">Date</TableHead>
//               <TableHead>Method</TableHead>
//               <TableHead>Amount</TableHead>
//               <TableHead className="text-right">Status</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {withdrawal.history.map((item) => (
//               <TableRow key={item.id}>
//                 <TableCell className="font-medium py-5">
//                   {readableTimestamp(item?.date)}
//                 </TableCell>
//                 <TableCell>{"Bank Account"}</TableCell>
//                 <TableCell>₹{item.amount}</TableCell>
//                 <TableCell className="text-right">
//                   <Badge
//                     className={`text-white ${item.status == "PENDING" ? "bg-red-500 " : "bg-green-500"}
//                    `}
//                   >
//                     {item.status}
//                   </Badge>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </div>
//     </div>
//   );
// };

// export default Withdrawal;
