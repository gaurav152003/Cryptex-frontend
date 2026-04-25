// /* eslint-disable no-unused-vars */
// /* eslint-disable react/prop-types */
// import { sendVerificationOtp, verifyOtp } from "@/Redux/Auth/Action";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Auth from "../Auth/Auth";

// const AccountVarificationForm = ({ handleSubmit }) => {
//   const [value, setValue] = useState("");
//   const dispatch = useDispatch();
//   const { auth } = useSelector((store) => store);

//   const handleOnChange = (e) => {
//     console.log(e.target.value);
//   };

//   const handleSendOtp = (verificationType) => {
//     dispatch(
//       sendVerificationOtp({
//         verificationType,
//         jwt: localStorage.getItem("jwt"),
//       }),
//     );
//   };

//   return (
//     <div className="flex justify-center">
//       <div className="space-y-5 mt-10 w-full">
//         <div className="flex justify-between items-center">
//           <p className="">Email :</p>
//           <p>{auth.user?.email}</p>
//           <Dialog>
//             <DialogTrigger>
//               <Button onClick={() => handleSendOtp("EMAIL")}>Sent OTP</Button>
//             </DialogTrigger>
//             <DialogContent className="border border-white/20">
//               <DialogHeader className="">
//                 <DialogTitle className="px-10 pt-5 text-center">
//                   Enter OTP
//                 </DialogTitle>
//               </DialogHeader>
//               <div className="py-5 flex gap-10 justify-center items-center">
//                 <InputOTP
//                   value={value}
//                   onChange={(value) => setValue(value)}
//                   maxLength={6}
//                 >
//                   <InputOTPGroup>
//                     <InputOTPSlot index={0} />
//                     <InputOTPSlot index={1} />
//                     <InputOTPSlot index={2} />
//                   </InputOTPGroup>
//                   <InputOTPSeparator />
//                   <InputOTPGroup>
//                     <InputOTPSlot index={3} />
//                     <InputOTPSlot index={4} />
//                     <InputOTPSlot index={5} />
//                   </InputOTPGroup>
//                 </InputOTP>
//                 <DialogClose>
//                   <Button
//                     onClick={() => handleSubmit(value)}
//                     className="w-[10rem]"
//                   >
//                     Submit
//                   </Button>
//                 </DialogClose>
//               </div>
//             </DialogContent>
//           </Dialog>
//         </div>
//         {/* <div className="flex justify-between items-center">
//           <p className="">Mobile :</p>
//           <p>+918987667899</p>

//           <Button onClick={() => handleSendOtp("MOBILE")}>Sent OTP</Button>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default AccountVarificationForm;

/* eslint-disable react/prop-types */
/* eslint-disable react/prop-types */
import { sendVerificationOtp } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/components/ui/use-toast";

const AccountVarificationForm = ({ handleSubmit, mode }) => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { toast } = useToast();

  /* ---------------- SEND OTP ---------------- */
  const handleSendOtp = () => {
    dispatch(
      sendVerificationOtp({
        verificationType: "EMAIL",
        jwt: localStorage.getItem("jwt"),
      }),
    );
  };

  /* ---------------- VERIFY / ENABLE ---------------- */
  const handleVerify = () => {
    handleSubmit(value);
  };

  /* ---------------- SUCCESS TOASTS ---------------- */
  useEffect(() => {
    // ✅ ACCOUNT VERIFICATION
    if (auth.verified && mode === "VERIFY_ACCOUNT") {
      toast({
        title: "Account Verified ✅",
        description: "Your email has been successfully verified.",
        className: "bg-green-600 text-white",
      });
      setValue("");
      setOpen(false);
    }

    // ✅ TWO STEP AUTH
    if (auth.twoFactorEnabled && mode === "TWO_STEP_AUTH") {
      toast({
        title: "Two Step Authentication Enabled 🔐",
        description: "Your account is now more secure.",
        className: "bg-blue-600 text-white",
      });
      setValue("");
      setOpen(false);
    }
  }, [auth.verified, auth.twoFactorEnabled, mode, toast]);
  const [open, setOpen] = useState(false);
  return (
    <div className="flex justify-center">
      <div className="space-y-5 mt-6 w-full">
        <div className="flex justify-between items-center">
          <p>Email :</p>
          <p>{auth.user?.email}</p>

          <Dialog open={open} onChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={() => {
                  (handleSendOtp(), setOpen(true));
                }}
              >
                Send OTP
              </Button>
            </DialogTrigger>

            <DialogContent className="border border-white/20">
              <DialogHeader>
                <DialogTitle className="text-center">Enter OTP</DialogTitle>
              </DialogHeader>

              <div className="py-6 space-y-4 flex flex-col items-center">
                <InputOTP
                  value={value}
                  onChange={(v) => setValue(v)}
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>

                {/* ❌ ERROR */}
                {auth.error && (
                  <p className="text-sm text-red-500 text-center">
                    {auth.error}
                  </p>
                )}

                <Button
                  onClick={handleVerify}
                  disabled={value.length !== 6}
                  className="w-[10rem]"
                >
                  Verify
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default AccountVarificationForm;
