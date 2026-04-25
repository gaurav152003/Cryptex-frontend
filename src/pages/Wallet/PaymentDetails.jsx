/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import PaymentDetailsForm from "./PaymentDetailsForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getPaymentDetails } from "@/Redux/Withdrawal/Action";
import { maskAccountNumber } from "@/Util/maskAccountNumber";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const PaymentDetails = () => {
  const dispatch = useDispatch();
  const { withdrawal } = useSelector((store) => store);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getPaymentDetails({ jwt: localStorage.getItem("jwt") }));
  }, [dispatch]);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 mt-24">
      {/* BACK */}
      <div
        onClick={() => navigate("/")}
        className="flex items-center gap-2 text-gray-400 hover:text-white cursor-pointer mb-6"
      >
        <IoMdArrowRoundBack className="h-5 w-5" />
        <span className="text-sm">Back</span>
      </div>

      {/* TITLE */}
      <h1 className="text-3xl font-bold mb-8">Bank Details</h1>

      {/* ================= EDIT MODE ================= */}
      {withdrawal.paymentDetails ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <Card className="border border-white/10 bg-background/60 backdrop-blur-xl shadow-lg">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-xl">
                    {withdrawal.paymentDetails.bankName.toUpperCase()}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    A/C No:{" "}
                    {maskAccountNumber(withdrawal.paymentDetails.accountNumber)}
                  </CardDescription>
                </div>

                <DialogTrigger asChild>
                  <Button variant="outline">Edit</Button>
                </DialogTrigger>
              </div>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex">
                <p className="w-36 text-sm text-gray-400">Account Holder</p>
                <p className="text-sm">
                  : {withdrawal.paymentDetails.accountHolderName}
                </p>
              </div>

              <div className="flex">
                <p className="w-36 text-sm text-gray-400">IFSC Code</p>
                <p className="text-sm">
                  : {withdrawal.paymentDetails.ifsc.toUpperCase()}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* EDIT MODAL */}
          <DialogContent className="border border-white/20 max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Bank Details</DialogTitle>
            </DialogHeader>

            <PaymentDetailsForm
              isEdit
              initialData={withdrawal.paymentDetails}
              setOpen={setOpen}
            />
          </DialogContent>
        </Dialog>
      ) : (
        /* ================= ADD MODE ================= */
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="h-12 px-8 text-base">Add Bank Details</Button>
          </DialogTrigger>

          <DialogContent className="border border-white/20 max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Bank Details</DialogTitle>
            </DialogHeader>

            <PaymentDetailsForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default PaymentDetails;
