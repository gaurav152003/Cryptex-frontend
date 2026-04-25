import { paymentHandler } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { Toast } from "@/components/ui/toast";
import { DotFilledIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";
import stripelogo from "@/assets/stripe.png";
const TopupForm = () => {
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("RAZORPAY");
  const { wallet } = useSelector((store) => store);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const handleSubmit = () => {
    if (!amount || amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount greater than 0.",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      paymentHandler({
        jwt: localStorage.getItem("jwt"),
        paymentMethod,
        amount,
      }),
    );
  };

  return (
    <div className="pt-8 space-y-8 max-w-xl mx-auto">
      {/* Amount */}
      <div className="space-y-2">
        <Label className="text-base">Enter Amount</Label>
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-lg">
            $
          </span>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="pl-10 py-7 text-lg"
            placeholder="1000"
            type="number"
          />
        </div>
      </div>

      {/* Payment Methods */}
      <div className="space-y-3">
        <Label className="text-base">Select payment method</Label>

        <RadioGroup
          defaultValue="RAZORPAY"
          onValueChange={setPaymentMethod}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {/* Razorpay */}
          <Label
            htmlFor="razorpay"
            className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition
              ${
                paymentMethod === "RAZORPAY"
                  ? "border-primary bg-primary/5"
                  : "hover:border-muted-foreground/40"
              }`}
          >
            <RadioGroupItem
              value="RAZORPAY"
              id="razorpay"
              icon={DotFilledIcon}
            />
            <div className="bg-white rounded-md px-4 py-2 w-32">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                alt="Razorpay"
              />
            </div>
          </Label>

          {/* Stripe */}
          <Label
            htmlFor="stripe"
            className={`flex items-center gap-4 border rounded-xl p-4 cursor-pointer transition
              ${
                paymentMethod === "STRIPE"
                  ? "border-primary bg-primary/5"
                  : "hover:border-muted-foreground/40"
              }`}
          >
            <RadioGroupItem value="STRIPE" id="stripe" icon={DotFilledIcon} />
            <div className="bg-white rounded-md px-4 py-1 w-32">
              <img className="h-8 w-14" src={stripelogo} alt="Stripe" />
            </div>
          </Label>
        </RadioGroup>
      </div>

      {/* Submit */}
      {wallet.loading ? (
        <Skeleton className="h-14 w-full rounded-xl" />
      ) : (
        <Button
          onClick={handleSubmit}
          className="w-full h-14 text-lg rounded-xl"
          disabled={!amount}
        >
          Continue to Pay
        </Button>
      )}
    </div>
  );
};

export default TopupForm;
