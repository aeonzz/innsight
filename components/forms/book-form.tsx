"use client";

import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { bookRoom, createRoom } from "@/lib/actions/room.actions";
import { toast } from "sonner";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import {
  format,
  isBefore,
  startOfToday,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { useRouter, useSearchParams } from "next/navigation";

interface BookFormProps {
  roomId: string;
  currentUsrId: string;
  setCheckOut: (state: boolean) => void;
  setDate: (date: DateRange | undefined) => void;
  date: DateRange | undefined;
  setBookingId: (bookingId: string) => void;
}

const FormSchema = z.object({
  name: z.string().min(1, {
    message: "Name is required",
  }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, {
    message: "Address is required",
  }),
});

const BookForm: React.FC<BookFormProps> = ({
  roomId,
  currentUsrId,
  setCheckOut,
  setDate,
  date,
  setBookingId,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const disablePastDates = (date: Date) => isBefore(date, startOfToday());

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    if (!date?.from || !date?.to) {
      toast.error("Date range is required");
      setIsLoading(false);
      return;
    }

    const data = {
      ...values,
      roomId,
      userId: currentUsrId,
      fromDate: date.from,
      toDate: date.to,
    };

    const response = await bookRoom(data);

    if (response.data && response.status === 200) {
      setBookingId(response.data.id)
      setIsLoading(false);
      setCheckOut(true);
      router.refresh();
      // toast.success("Successful", {
      //   description: "Room created successfuly",
      // });
    } else {
      setIsLoading(false);
      toast.error("Uh oh! Something went wrong.", {
        description:
          "An error occurred while making the request. Please try again later",
      });
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex-1 space-y-3">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name"
                  className="py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Home Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your address"
                  className="py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Phone No.</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter your phone number"
                  className="py-6"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className={cn("grid gap-2")}>
          <FormLabel>Date</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant={"outline"}
                className={cn(
                  "w-full bg-slate-100 py-6 justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, "LLL dd, y")} -{" "}
                      {format(date.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(date.from, "LLL dd, y")
                  )
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
                disabled={disablePastDates}
              />
            </PopoverContent>
          </Popover>
        </div>
        <Button disabled={isLoading} type="submit" className="w-full py-6">
          Confirm
        </Button>
      </form>
    </Form>
  );
};

export default BookForm;
