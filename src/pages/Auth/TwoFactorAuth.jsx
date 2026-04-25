// import { twoStepVerification } from "@/Redux/Auth/Action";
// import CustomeToast from "@/components/custome/CustomeToast";
// import { Avatar, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSeparator,
//   InputOTPSlot,
// } from "@/components/ui/input-otp";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";

// const TwoFactorAuth = () => {
//   const [value, setValue] = useState("");
//   const dispatch = useDispatch();
//   const { session } = useParams();
//   const navigate = useNavigate();
//   const { auth } = useSelector((store) => store);

//   const handleTwoFactoreAuth = () => {
//     dispatch(twoStepVerification({ otp: value, session, navigate }));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-black">
//       <CustomeToast show={auth?.error} message={auth?.error?.error} />

//       <Card className="w-[420px] rounded-2xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)] px-8 py-10">
//         <div className="space-y-6 text-center">
//           {/* ICON */}
//           <Avatar className="w-20 h-20 mx-auto">
//             <AvatarImage src="https://cdn.dribbble.com/users/1125847/screenshots/15197732/media/7201b01895b7b60d33eea77d098eb7b3.png?resize=1600x1200&vertical=center" />
//           </Avatar>

//           {/* TITLE */}
//           <div>
//             <h1 className="text-2xl font-bold text-black">
//               Two-Step Verification
//             </h1>
//             <p className="text-sm text-gray-500 mt-1">
//               Enter the 6-digit code sent to your email
//             </p>
//           </div>

//           {/* OTP */}
//           <div className="flex flex-col items-center gap-2">
//             <InputOTP value={value} onChange={setValue} maxLength={6}>
//               <InputOTPGroup>
//                 <InputOTPSlot index={0} />
//                 <InputOTPSlot index={1} />
//                 <InputOTPSlot index={2} />
//               </InputOTPGroup>
//               <InputOTPSeparator />
//               <InputOTPGroup>
//                 <InputOTPSlot index={3} />
//                 <InputOTPSlot index={4} />
//                 <InputOTPSlot index={5} />
//               </InputOTPGroup>
//             </InputOTP>

//             <p className="text-xs text-gray-500">
//               Check your inbox (and spam folder)
//             </p>
//           </div>

//           {/* BUTTON */}
//           <Button
//             onClick={handleTwoFactoreAuth}
//             className="w-full py-5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
//           >
//             Verify
//           </Button>
//         </div>
//       </Card>
//     </div>
//   );
// };

// export default TwoFactorAuth;

/* eslint-disable no-unused-vars */
import { twoStepVerification } from "@/Redux/Auth/Action";
import CustomeToast from "@/components/custome/CustomeToast";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const TwoFactorAuth = () => {
  const [value, setValue] = useState("");
  const [otpError, setOtpError] = useState("");

  const dispatch = useDispatch();
  const { session } = useParams();
  const navigate = useNavigate();
  const { auth } = useSelector((store) => store);

  const handleTwoFactoreAuth = () => {
    // 🔴 Frontend validation
    if (!value || value.length === 0) {
      setOtpError("Please enter the OTP");
      return;
    }

    if (value.length < 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    // ✅ Clear error & call API
    setOtpError("");
    dispatch(twoStepVerification({ otp: value, session, navigate }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      {/* BACKEND ERROR */}
      <CustomeToast show={auth?.error} message={auth?.error?.error} />

      <Card className="w-[420px] rounded-2xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)] px-8 py-10">
        <div className="space-y-6 text-center">
          {/* ICON */}
          <Avatar className="w-20 h-20 mx-auto">
            <AvatarImage src="https://cdn.dribbble.com/users/1125847/screenshots/15197732/media/7201b01895b7b60d33eea77d098eb7b3.png?resize=1600x1200&vertical=center" />
          </Avatar>

          {/* TITLE */}
          <div>
            <h1 className="text-2xl font-bold text-black">
              Two-Step Verification
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter the 6-digit code sent to your email
            </p>
          </div>

          {/* OTP INPUT */}
          <div className="flex flex-col items-center gap-2">
            <InputOTP
              value={value}
              onChange={(val) => {
                setValue(val);
                setOtpError(""); // clear error while typing
              }}
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

            {/* OTP ERROR */}
            {otpError && (
              <p className="text-sm text-red-500 font-medium">{otpError}</p>
            )}

            <p className="text-xs text-gray-500">
              Check your inbox (and spam folder)
            </p>
          </div>

          {/* VERIFY BUTTON */}
          <Button
            onClick={handleTwoFactoreAuth}
            disabled={value.length < 6}
            className="w-full py-5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Verify
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default TwoFactorAuth;
