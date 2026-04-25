import { transferMoney } from "@/Redux/Wallet/Action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const TransferForm = ({ setTransferOpen }) => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  const { transferSuccess, error } = useSelector((store) => store.wallet);

  const [formData, setFormData] = useState({
    amount: "",
    walletId: "",
    purpose: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    if (!formData.amount || formData.amount <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please Enter Valid Amount",
        variant: "destructive",
      });
      return;
    }

    dispatch(
      transferMoney({
        jwt: localStorage.getItem("jwt"),
        walletId: formData.walletId,
        reqData: {
          amount: formData.amount,
          purpose: formData.purpose,
        },
      }),
    );
  };

  // ✅ SUCCESS / ERROR TOAST
  useEffect(() => {
    if (transferSuccess) {
      toast({
        title: "Transfer successful 🎉",
        className: "bg-green-600 text-white",
      });

      setTransferOpen(false);
      dispatch({ type: "RESET_TRANSFER" });
    }

    if (error) {
      toast({
        variant: "destructive",
        title: "Transfer failed",
        description: error,
      });
    }
  }, [transferSuccess, error]);
  return (
    <div className="pt-10 space-y-5">
      <Input
        type="number"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        placeholder="$9999"
        className="py-7"
      />
      <Input
        name="walletId"
        value={formData.walletId}
        onChange={handleChange}
        placeholder="#ADFE34456"
        className="py-7"
      />
      <Input
        name="purpose"
        value={formData.purpose}
        onChange={handleChange}
        placeholder="gift for your friend..."
        className="py-7"
      />

      <Button
        disabled={!formData.amount}
        onClick={handleSubmit}
        className="w-full p-7 text-xl"
      >
        Send
      </Button>
    </div>
  );
};

export default TransferForm;
