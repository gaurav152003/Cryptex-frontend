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
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "@/Redux/Auth/Action";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  fullName: z.string().nonempty("Full name is required"),
  email: z.string().email("Invalid email address").optional(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .optional(),
});

const SignupForm = () => {
  const { auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      fullName: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(register(data));
    console.log("signup form", data);
  };

  return (
    <div className="space-y-5">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-3 text-black"
        >
          {/* FULL NAME */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 px-4 py-5 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

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

          {/* PASSWORD WITH EYE */}
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
                      placeholder="Create a password"
                      className="w-full rounded-xl border border-gray-300 px-4 py-5 pr-12 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* SUBMIT */}
          {!auth.loading ? (
            <Button
              type="submit"
              className="w-full py-5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Create Account
            </Button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </Form>
    </div>
  );
};

export default SignupForm;
