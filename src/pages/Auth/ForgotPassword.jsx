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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { sendResetPassowrdOTP } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});

const ForgotPasswordForm = () => {
  const [verificationType, setVerificationType] = useState("EMAIL");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(
      sendResetPassowrdOTP({
        sendTo: data.email,
        navigate,
        verificationType,
      }),
    );
    console.log("forgot password form", data);
  };

  return (
    <div className="space-y-2">
      {/* TITLE */}
      {/* <h1 className="text-center text-lg font-semibold text-gray-800">
        Reset your password
      </h1> */}

      <p className="text-center text-sm text-gray-500">
        We’ll send a verification code to your email
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 text-black"
        >
          {/* EMAIL */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 px-4 py-5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
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
            Send OTP
          </Button>
        </form>
      </Form>

      {/* BACK TO LOGIN */}
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
  );
};

export default ForgotPasswordForm;
