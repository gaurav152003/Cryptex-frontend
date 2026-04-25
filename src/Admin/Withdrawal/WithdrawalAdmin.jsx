import {
  getAllWithdrawalRequest,
  proceedWithdrawal,
} from "@/Redux/Withdrawal/Action";
import { readableTimestamp } from "@/Util/readbaleTimestamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const WithdrawalAdmin = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAllWithdrawalRequest(localStorage.getItem("jwt")));
  }, []);

  const handleProceedWithdrawal = (id, accept) => {
    dispatch(
      proceedWithdrawal({
        jwt: localStorage.getItem("jwt"),
        id,
        accept,
      }),
    );
  };

  // 🔥 Latest request on top
  const sortedRequests = [...(withdrawal.requests || [])].sort(
    (a, b) => new Date(b.date) - new Date(a.date),
  );

  return (
    <div className="px-2 lg:px-8 py-5 text-white">
      <Card className="bg-black border border-white/10">
        <CardHeader>
          {/* <CardTitle className="text-2xl font-semibold ">
            Users Withdrawal
          </CardTitle> */}
        </CardHeader>

        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-white/10">
                <TableHead>Date</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead className="text-right">Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {sortedRequests.map((item) => (
                <TableRow
                  key={item.id}
                  className="border-b border-white/5 hover:bg-white/5 transition"
                >
                  {/* DATE */}
                  <TableCell>{readableTimestamp(item?.date)}</TableCell>

                  {/* USER */}
                  <TableCell>
                    <p className="font-medium">{item.user.fullName}</p>
                    <p className="text-sm text-gray-400">{item.user.email}</p>
                  </TableCell>

                  {/* METHOD */}
                  <TableCell className="text-gray-300">Bank Account</TableCell>

                  {/* AMOUNT */}
                  <TableCell className="text-right font-semibold text-green-400">
                    ${item.amount.toLocaleString()}
                  </TableCell>

                  {/* STATUS */}
                  <TableCell className="text-right">
                    <Badge
                      className={
                        item.status === "PENDING"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : "bg-green-500/20 text-green-400"
                      }
                    >
                      {item.status}
                    </Badge>
                  </TableCell>

                  {/* ACTION */}
                  <TableCell className="text-right space-x-2">
                    {item.status === "PENDING" ? (
                      <>
                        <Button
                          size="sm"
                          className="bg-green-500 hover:bg-green-600"
                          onClick={() => handleProceedWithdrawal(item.id, true)}
                        >
                          Accept
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() =>
                            handleProceedWithdrawal(item.id, false)
                          }
                        >
                          Decline
                        </Button>
                      </>
                    ) : (
                      <span className="text-sm text-gray-400">Processed</span>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WithdrawalAdmin;
