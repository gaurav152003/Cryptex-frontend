import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

import { useState, useEffect } from "react";

import "./WithdrawForm.css";
import { useDispatch, useSelector } from "react-redux";
import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { useNavigate } from "react-router-dom";

const MIN_WITHDRAW_AMOUNT = 50;

const WithdrawForm = ({ setOpen }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [amount, setAmount] = useState("");

  const { wallet, withdrawal } = useSelector((store) => store);

  const handleChange = (e) => {
    const value = e.target.value;

    // limit input length
    if (value.toString().length < 6) {
      setAmount(value);
    }
  };

  const handleSubmit = () => {
    const numericAmount = Number(amount);
    const balance = wallet.userWallet?.balance || 0;

    if (!numericAmount || numericAmount <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid amount",
        description: "Please enter a valid withdrawal amount",
      });
      return;
    }

    if (numericAmount < MIN_WITHDRAW_AMOUNT) {
      toast({
        variant: "destructive", // ✅ RED
        title: "Minimum withdrawal",
        description: `Minimum withdrawal amount is $${MIN_WITHDRAW_AMOUNT}`,
      });
      return;
    }

    if (numericAmount > balance) {
      toast({
        variant: "destructive",
        title: "Insufficient balance",
        description: "You don’t have enough balance to withdraw this amount",
      });
      return;
    }

    dispatch(
      withdrawalRequest({
        jwt: localStorage.getItem("jwt"),
        amount: numericAmount,
      }),
    );
  };

  // handle success & error
  useEffect(() => {
    if (withdrawal.withdrawSuccess) {
      toast({
        title: "Withdrawal successful 🎉",
        description: `$${amount} has been sent to your bank account`,
        className: "bg-green-600 text-white",
      });

      setAmount("");
      setOpen && setOpen(false);

      dispatch({ type: "RESET_WITHDRAW" });
    }

    if (withdrawal.error) {
      toast({
        variant: "destructive",
        title: "Withdrawal failed",
        description: withdrawal.error,
      });
    }
  }, [withdrawal.withdrawSuccess, withdrawal.error]);

  if (!withdrawal.paymentDetails) {
    return (
      <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
        <p className="text-2xl font-bold">Add payment method</p>
        <Button onClick={() => navigate("/payment-details")}>
          Add Bank Details
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-10 space-y-5">
      <div className="flex justify-between items-center rounded-md bg-blue-500 text-xl font-bold px-5 py-4 text-white">
        <p>Available balance</p>
        <p>${wallet.userWallet?.balance}</p>
      </div>

      <div className="flex flex-col items-center">
        <h1>Enter withdrawal amount</h1>

        <div className="flex items-center justify-center">
          <Input
            onChange={handleChange}
            value={amount}
            className="withdrawInput py-7 border-none outline-none px-0  text-center"
            placeholder="$50 minimum"
            type="number"
          />
        </div>
      </div>

      <div>
        <p className="pb-2">Transfer to</p>
        <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
          <img
            className="h-8 w-8"
            src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
            alt="bank"
          />
          <div>
            <p className="text-xl font-bold">
              {withdrawal.paymentDetails?.bankName}
            </p>
            <p className="text-xs">
              {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
            </p>
          </div>
        </div>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={!amount}
        className="w-full py-7 text-xl"
      >
        Withdraw {amount && <span className="ml-5">${amount}</span>}
      </Button>
    </div>
  );
};

export default WithdrawForm;
//
//
//
//
//

// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";

// import { useState } from "react";

// import "./WithdrawForm.css";
// import { useDispatch, useSelector } from "react-redux";
// import { withdrawalRequest } from "@/Redux/Withdrawal/Action";
// import { DialogClose } from "@/components/ui/dialog";
// import { maskAccountNumber } from "@/Util/maskAccountNumber";
// import { useNavigate } from "react-router-dom";

// const WithdrawForm = () => {
//   const dispatch = useDispatch();
//   const [amount, setAmount] = useState();
//   const { wallet, withdrawal } = useSelector((store) => store);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     let value = e.target.value;
//     if (value.toString().length < 6) {
//       setAmount(e.target.value);
//     }
//   };

//   const handleSubmit = () => {
//     dispatch(withdrawalRequest({ jwt: localStorage.getItem("jwt"), amount }));
//   };

//   if (!withdrawal.paymentDetails) {
//     return (
//       <div className="h-[20rem] flex gap-5 flex-col justify-center items-center">
//         <p className="text-2xl font-bold">Add payment method</p>
//         <Button onClick={() => navigate("/payment-details")}>
//           Add Payment Details
//         </Button>
//       </div>
//     );
//   }

//   return (
//     <div className="pt-10 space-y-5">
//       <div className="flex justify-between items-center rounded-md bg-slate-900 text- text-xl font-bold px-5 py-4">
//         <p>Available balance</p>
//         <p>${wallet.userWallet?.balance}</p>
//       </div>
//       <div className="flex flex-col items-center">
//         <h1 className="">Enter withdrawal amount</h1>

//         <div className="flex items-center justify-center ">
//           <Input
//             onChange={handleChange}
//             value={amount}
//             className="withdrawInput py-7 border-none outline-none focus:outline-none px-0 text-2xl text-center "
//             placeholder="$9999"
//             type="number"
//           />
//         </div>
//       </div>

//       <div>
//         <p className="pb-2">Transfer to</p>
//         <div className="flex items-center gap-5 border px-5 py-2 rounded-md">
//           <img
//             className="h-8 w-8"
//             src="https://cdn.pixabay.com/photo/2020/02/18/11/03/bank-4859142_1280.png"
//             alt=""
//           />
//           <div>
//             <p className="text-xl font-bold">
//               {withdrawal.paymentDetails?.bankName}
//             </p>
//             <p className="text-xs">
//               {maskAccountNumber(withdrawal.paymentDetails?.accountNumber)}
//             </p>
//           </div>
//         </div>
//       </div>
//       <DialogClose className="w-full">
//         <Button
//           onClick={handleSubmit}
//           variant=""
//           className="w-full py-7 text-xl"
//         >
//           Withdraw {amount && <span className="ml-5">${amount}</span>}
//         </Button>
//       </DialogClose>
//     </div>
//   );
// };

// export default WithdrawForm;
