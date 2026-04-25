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
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/Redux/Auth/Action";
import { useNavigate } from "react-router-dom";
import SpinnerBackdrop from "@/components/custome/SpinnerBackdrop";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    data.navigate = navigate;
    dispatch(login(data));
    console.log("login form", data);
  };

  return (
    <div className="space-y-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-2 text-black"
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
                    className="w-full rounded-xl border border-gray-300 px-4 py-5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-gray-300 px-4 py-5 pr-12 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
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

          {/* FORGOT PASSWORD */}
          <div className="text-right">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          {/* SUBMIT */}
          {!auth.loading ? (
            <Button
              type="submit"
              className="w-full py-5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-semibold"
            >
              Login
            </Button>
          ) : (
            <SpinnerBackdrop show={true} />
          )}
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
