/* eslint-disable no-unused-vars */
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { verifyResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = yup.object({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters long")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
  otp: yup
    .string()
    .min(6, "OTP must be at least 6 characters long")
    .required("OTP is required"),
});

const ResetPasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { session } = useParams();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { auth } = useSelector((store) => store);
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      confirmPassword: "",
      password: "",
      otp: "",
    },
  });

  useEffect(() => {
    if (auth.error) {
      form.setError("otp", {
        type: "manual",
        message: "Wrong OTP. Please try again.",
      });
    }
  }, [auth.error, form]);
  const onSubmit = (data) => {
    dispatch(
      verifyResetPassowrdOTP({
        otp: data.otp,
        password: data.password,
        session,
        navigate,
      }),
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <Card className="w-[420px] rounded-2xl border border-white/20 shadow-[0_30px_80px_rgba(0,0,0,0.9)] px-8 py-10">
        <div className="space-y-6 w-full text-black">
          {/* TITLE */}
          <div className="text-center">
            <h1 className="text-2xl font-bold">Reset Password</h1>
            <p className="text-sm text-gray-500 mt-1">
              Enter OTP and create a new password
            </p>
          </div>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5 text-white"
            >
              {/* OTP */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex justify-center">
                        <InputOTP {...field} maxLength={6}>
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
                      </div>
                    </FormControl>
                    <FormMessage className="text-center" />
                  </FormItem>
                )}
              />

              {/* NEW PASSWORD */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="New password"
                          className="w-full rounded-xl border border-gray-300 px-4 py-5 pr-12 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                        >
                          {showPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm new password"
                          className="w-full rounded-xl border border-gray-300 px-4 py-5 pr-12 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                        >
                          {showConfirmPassword ? (
                            <EyeOff size={18} />
                          ) : (
                            <Eye size={18} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* SUBMIT */}
              <Button
                type="submit"
                className="w-full py-5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              >
                Change Password
              </Button>
            </form>
          </Form>

          {/* BACK */}
          <div className="text-center text-sm text-gray-600">
            Remember your password?
            <span
              onClick={() => navigate("/signin")}
              className="ml-1 font-semibold text-blue-500 cursor-pointer hover:underline"
            >
              Sign in
            </span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ResetPasswordForm;
