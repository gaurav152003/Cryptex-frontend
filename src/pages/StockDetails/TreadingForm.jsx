import { getAssetDetails } from "@/Redux/Assets/Action";
import { payOrder } from "@/Redux/Order/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { DotIcon } from "@radix-ui/react-icons";
import { DollarSign } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import { getUserWallet } from "@/Redux/Wallet/Action";
const TreadingForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { coin, asset, wallet, order } = useSelector((store) => store);

  const [orderType, setOrderType] = useState("BUY");
  const [amount, setAmount] = useState(""); // 🔥 MUST be number
  const [quantity, setQuantity] = useState(0);

  const price = Number(coin.coinDetails?.market_data?.current_price?.usd || 0);
  const walletBalance = Number(wallet.userWallet?.balance || 0);
  const ownedQuantity = Number(asset.assetDetails?.quantity || 0);

  // ---------------- INPUT HANDLER ----------------
  const handleOnChange = (e) => {
    const value = e.target.value;

    if (value === "") {
      setAmount("");
      setQuantity(0);
      return;
    }

    const numericValue = Number(value);
    if (numericValue < 0) return;

    setAmount(numericValue);

    if (price > 0) {
      setQuantity(Number((numericValue / price).toFixed(5)));
    }
  };

  // ---------------- SUBMIT ----------------
  const handleBuyCrypto = () => {
    dispatch(
      payOrder({
        jwt: localStorage.getItem("jwt"),
        amount,
        orderData: {
          coinId: coin.coinDetails?.id,
          quantity,
          orderType,
        },
      }),
    );
  };

  // ---------------- FETCH ASSET ----------------
  useEffect(() => {
    if (coin.coinDetails?.id) {
      dispatch(
        getAssetDetails({
          coinId: coin.coinDetails.id,
          jwt: localStorage.getItem("jwt"),
        }),
      );
    }
  }, [coin.coinDetails?.id, dispatch]);

  // ---------------- VALIDATIONS ----------------
  const insufficientSell = orderType === "SELL" && quantity > ownedQuantity;

  const insufficientBuy =
    orderType === "BUY" && amount > 0 && amount > walletBalance;

  // ---------------- TOAST (SUCCESS / ERROR) ----------------
  useEffect(() => {
    if (order.order) {
      toast({
        title:
          orderType === "BUY"
            ? "Coin purchased successfully"
            : "Coin sold successfully",
        description:
          orderType === "BUY"
            ? `$${amount} worth coin added to your portfolio`
            : "Coin removed from your portfolio",
        className: "bg-green-600 text-white",
      });

      // ✅ REFRESH WALLET
      dispatch(getUserWallet(localStorage.getItem("jwt")));

      // ✅ REFRESH ASSET (optional but recommended)
      dispatch(
        getAssetDetails({
          coinId: coin.coinDetails.id,
          jwt: localStorage.getItem("jwt"),
        }),
      );

      setOpen(false);
      dispatch({ type: "RESET_ORDER" });
    }
  }, [order.order]);
  return (
    <div className="space-y-10 p-5">
      {/* INPUT */}
      <div>
        <div className="flex gap-4 items-center justify-between">
          <Input
            className="py-7"
            placeholder="Enter amount ..."
            type="number"
            value={amount}
            onChange={handleOnChange}
          />

          <p className="border text-2xl flex justify-center items-center w-36 h-14 rounded-md">
            {quantity}
          </p>
        </div>

        {insufficientSell && (
          <p className="text-red-800 text-center pt-4">
            Insufficient quantity to sell
          </p>
        )}

        {insufficientBuy && (
          <p className="text-red-800 text-center pt-4">
            Insufficient wallet balance to buy
          </p>
        )}
      </div>

      {/* COIN INFO */}
      <div className="flex gap-5 items-center">
        <Avatar>
          <AvatarImage src={coin.coinDetails?.image?.large} />
        </Avatar>

        <div>
          <div className="flex items-center gap-2">
            <p>{coin.coinDetails?.symbol?.toUpperCase()}</p>
            <DotIcon className="text-gray-400" />
            <p className="text-gray-400">{coin.coinDetails?.name}</p>
          </div>

          <p className="text-xl font-bold">{price}</p>
        </div>
      </div>

      {/* ORDER TYPE */}
      <div className="flex items-center justify-between">
        <p>Order Type</p>
        <p>{orderType}</p>
      </div>

      {/* BALANCE / QUANTITY */}
      <div className="flex items-center justify-between">
        <p>
          {orderType === "BUY" ? "Available Balance" : "Available Quantity"}
        </p>

        {orderType === "BUY" ? (
          <div className="flex items-center">
            <DollarSign />
            <span className="text-2xl font-semibold">{walletBalance}</span>
          </div>
        ) : (
          <p>{ownedQuantity}</p>
        )}
      </div>

      {/* ACTION BUTTONS */}
      <div>
        <Button
          onClick={handleBuyCrypto}
          className={`w-full py-6 text-white ${
            orderType === "BUY"
              ? "bg-green-600 hover:bg-green-700"
              : "bg-red-600 hover:bg-red-700"
          }`}
          disabled={
            amount <= 0 ||
            quantity <= 0 ||
            insufficientSell ||
            insufficientBuy ||
            order.loading
          }
        >
          {orderType}
        </Button>

        <Button
          onClick={() => setOrderType(orderType === "BUY" ? "SELL" : "BUY")}
          className="w-full mt-5 text-xl"
          variant="link"
        >
          {orderType === "BUY" ? "Or SELL" : "Or BUY"}
        </Button>
      </div>
    </div>
  );
};

export default TreadingForm;
