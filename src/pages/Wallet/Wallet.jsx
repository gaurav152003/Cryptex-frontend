/* eslint-disable no-unused-vars */
import {
  depositMoney,
  getUserWallet,
  getWalletTransactions,
} from "@/Redux/Wallet/Action";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CopyIcon,
  DownloadIcon,
  ReloadIcon,
  ShuffleIcon,
  UpdateIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import { DollarSign, WalletIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopupForm from "./TopupForm";
import TransferForm from "./TransferForm";
import WithdrawForm from "./WithdrawForm";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Wallet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { wallet } = useSelector((store) => store);
  const query = useQuery();
  const paymentId = query.get("payment_id");
  const razorpayPaymentId = query.get("razorpay_payment_id");
  const orderId = query.get("order_id");
  const { order_id } = useParams();

  const [open, setOpen] = useState(false);
  const [trasnfetOpen, setTransferOpen] = useState(false);

  useEffect(() => {
    if (orderId || order_id) {
      dispatch(
        depositMoney({
          jwt: localStorage.getItem("jwt"),
          orderId: orderId || order_id,
          paymentId: razorpayPaymentId || "temp",
          navigate,
        }),
      );
    }
  }, [paymentId, orderId, razorpayPaymentId]);

  useEffect(() => {
    dispatch(getUserWallet(localStorage.getItem("jwt")));
    dispatch(getWalletTransactions({ jwt: localStorage.getItem("jwt") }));
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, []);

  if (wallet.loading) return <SpinnerBackdrop />;

  return (
    <div className="px-4 lg:px-0 flex justify-center mt-20">
      <div className="w-full lg:w-[60%] py-10 space-y-10">
        {/* WALLET CARD */}
        <Card className="bg-black border border-white/10">
          <CardHeader className="pb-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <WalletIcon className="h-8 w-8 text-blue-500" />
                <div>
                  <CardTitle className="text-2xl">My Wallet</CardTitle>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>#FAVHJY{wallet.userWallet?.id}</span>
                    <CopyIcon
                      className="cursor-pointer hover:text-white"
                      onClick={() =>
                        navigator.clipboard.writeText(wallet.userWallet?.id)
                      }
                    />
                  </div>
                </div>
              </div>

              <ReloadIcon
                onClick={() =>
                  dispatch(getUserWallet(localStorage.getItem("jwt")))
                }
                className="h-6 w-6 cursor-pointer hover:text-gray-400"
              />
            </div>
          </CardHeader>

          <CardContent>
            {/* BALANCE */}
            <div className="flex items-center gap-2 text-3xl font-bold">
              <DollarSign />
              {wallet.userWallet?.balance}
            </div>

            {/* ACTIONS */}
            <div className="grid grid-cols-3 gap-6 mt-8">
              {/* ADD MONEY */}
              <Dialog>
                <DialogTrigger asChild>
                  <div className="wallet-action">
                    <UploadIcon />
                    <span>Add Money</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black border border-white/20 p-10">
                  <DialogHeader>
                    <DialogTitle className="text-center text-2xl">
                      Add Money
                    </DialogTitle>
                    <TopupForm />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* WITHDRAW */}
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <div className="wallet-action">
                    <DownloadIcon />
                    <span>Withdraw</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black border border-white/20 p-10">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Withdraw Money
                    </DialogTitle>
                    <WithdrawForm setOpen={setOpen} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>

              {/* TRANSFER */}
              <Dialog
                open={trasnfetOpen}
                onOpenChange={(value) => {
                  setTransferOpen(value);
                  if (value) dispatch({ type: "RESET_TRANSFER" });
                }}
              >
                <DialogTrigger asChild>
                  <div className="wallet-action">
                    <ShuffleIcon />
                    <span>Transfer</span>
                  </div>
                </DialogTrigger>
                <DialogContent className="bg-black border border-white/20 p-10">
                  <DialogHeader>
                    <DialogTitle className="text-center text-xl">
                      Transfer To Wallet
                    </DialogTitle>
                    <TransferForm setTransferOpen={setTransferOpen} />
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* HISTORY */}
        <div>
          <div className="flex items-center gap-2 mb-5">
            <h1 className="text-2xl font-semibold">History</h1>
            <UpdateIcon
              onClick={() =>
                dispatch(
                  getWalletTransactions({ jwt: localStorage.getItem("jwt") }),
                )
              }
              className="h-6 w-6 cursor-pointer hover:text-gray-400"
            />
          </div>

          <div className="space-y-4">
            {wallet.transactions?.map((item, index) => (
              <Card
                key={index}
                className="px-5 py-3 bg-black border border-white/10 flex justify-between items-center"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarFallback>
                      <ShuffleIcon />
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{item.type || item.purpose}</p>
                    <p className="text-xs text-gray-400">{item.date}</p>
                  </div>
                </div>

                <p
                  className={`font-semibold ${
                    item.amount > 0 ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {item.amount} USD
                </p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ACTION CARD STYLE */}
      <style jsx>{`
        .wallet-action {
          height: 96px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          cursor: pointer;
          border-radius: 12px;
          background: #000;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 6px 14px rgba(0, 0, 0, 0.7);
          transition: all 0.2s ease;
        }
        .wallet-action:hover {
          color: #60a5fa;
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.9);
        }
      `}</style>
    </div>
  );
};

export default Wallet;
