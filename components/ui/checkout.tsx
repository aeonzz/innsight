"use client";

import { differenceInCalendarDays } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { createPayment } from "@/lib/actions/payment.actions";
import { Input } from "./input";

const FormSchema = z.object({
  payment: z
    .string()
    .min(1, { message: "Payment is required" })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Payment must be a number" }),
});

interface CheckoutProps {
  date: DateRange | undefined;
  bookingId: string | undefined;
  roomId: string;
}

const Checkout: React.FC<CheckoutProps> = ({ date, bookingId, roomId }) => {
  const [totalPrice, setTotalPrice] = useState<number>(0);

  const searchParams = useSearchParams();
  const price = parseFloat(searchParams.get("price") || "0");
  const [bookDays, setBookDays] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    if (values.payment < totalPrice) {
      setIsLoading(false);
      toast.error("Insufficient Funds", {
        description:
          "Unfortunately, the provided payment amount is insufficient to cover the total cost of the room. The total price is ₱" +
          totalPrice.toFixed(2) +
          ". Please adjust your payment amount and try again.",
      });
      return;
    }

    // @ts-ignore
    const response = await createPayment(bookingId, values.payment, roomId);

    if (response.status === 200) {
      router.refresh();
      setIsLoading(false);
      toast.success("Successful", {
        description: "Room booked successfuly",
      });
      router.push("/home/rooms")
    } else {
      setIsLoading(false);
      toast.error("Uh oh! Something went wrong.", {
        description:
          "An error occurred while making the request. Please try again later",
      });
    }
  }

  useEffect(() => {
    if (date?.from && date?.to) {
      const days = differenceInCalendarDays(date.to, date.from) + 1;
      setBookDays(days);
      setTotalPrice(days * price);
    } else {
      setBookDays(0);
      setTotalPrice(0);
    }
  }, [date, price]);

  return (
    <div className="space-y-3">
      <p className="text-3xl text-secondary">
        Price per night:{" "}
        <span className="text-yellow-500 text-4xl">
          {price.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </span>{" "}
        x <span className="text-yellow-500 text-4xl"> {bookDays}</span> Night(s)
      </p>
      <p className="text-3xl text-secondary">
        Total:{" "}
        <span className="text-yellow-500 text-4xl">
          {totalPrice.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
        </span>
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex-1 space-y-3"
        >
          <FormField
            control={form.control}
            name="payment"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Payment</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter your payment"
                    className="py-6"
                    autoComplete="off"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isLoading} type="submit" className="w-full py-6">
            Checkout
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Checkout;
