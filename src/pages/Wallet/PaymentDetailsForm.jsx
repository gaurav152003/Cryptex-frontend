import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label";

import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { addPaymentDetails } from "@/Redux/Withdrawal/Action";
import { useToast } from "@/components/ui/use-toast";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from "lucide-react";
/* ================= VALIDATION ================= */

const formSchema = yup.object().shape({
  accountHolderName: yup.string().required(),
  ifsc: yup.string().required().length(11),
  accountNumber: yup
    .string()
    .required()
    .matches(/^[0-9]+$/)
    .min(9)
    .max(18),
  confirmAccountNumber: yup
    .string()
    .required()
    .oneOf([yup.ref("accountNumber")], "Account numbers do not match"),
  bankName: yup.string().required(),
});

const PaymentDetailsForm = ({ initialData, isEdit = false, setOpen }) => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      accountHolderName: "",
      ifsc: "",
      accountNumber: "",
      confirmAccountNumber: "",
      bankName: "",
    },
  });

  // ✅ PREFILL FOR EDIT
  useEffect(() => {
    if (isEdit && initialData) {
      form.reset({
        accountHolderName: initialData.accountHolderName,
        ifsc: initialData.ifsc,
        accountNumber: initialData.accountNumber,
        confirmAccountNumber: initialData.accountNumber,
        bankName: initialData.bankName,
      });
    }
  }, [isEdit, initialData, form]);

  const onSubmit = (data) => {
    const payload = {
      accountHolderName: data.accountHolderName,
      ifsc: data.ifsc,
      accountNumber: data.accountNumber,
      bankName: data.bankName,
    };

    dispatch(
      addPaymentDetails({
        paymentDetails: payload,
        jwt: localStorage.getItem("jwt"),
      }),
    );

    // ✅ TOAST
    toast({
      title: isEdit ? "Updated successfully" : "Added successfully",
      description: isEdit
        ? "Your Bank details have been updated."
        : "Your Bank details have been added.",
      variant: "success",
    });

    // ✅ CLOSE DIALOG
    setOpen(false);
  };

  return (
    <div className="px-10 py-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="accountHolderName"
            render={({ field }) => (
              <FormItem>
                <Label>Account Holder Name</Label>
                <FormControl>
                  <Input {...field} className="py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="ifsc"
            render={({ field }) => (
              <FormItem>
                <Label>IFSC Code</Label>
                <FormControl>
                  <Input {...field} className="py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <Label>Account Number</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="py-5 pr-12"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 "
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <Label>Account Number</Label>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...field}
                    className="py-5"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}

          <FormField
            control={form.control}
            name="confirmAccountNumber"
            render={({ field }) => (
              <FormItem>
                <Label>Confirm Account Number</Label>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      {...field}
                      className="py-5"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bankName"
            render={({ field }) => (
              <FormItem>
                <Label>Bank Name</Label>
                <FormControl>
                  <Input {...field} className="py-5" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!auth.loading ? (
            <Button type="submit" className="w-full py-5">
              {isEdit ? "UPDATE PAYMENT DETAILS" : "SUBMIT"}
            </Button>
          ) : (
            <Skeleton className="w-full py-5" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default PaymentDetailsForm;
