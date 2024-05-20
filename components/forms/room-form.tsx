"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RoomType } from "@prisma/client";
import { createRoom } from "@/lib/actions/room.actions";
import { toast } from "sonner";

interface RoomFormProps {
  setOpen: (state: boolean) => void;
}

const FormSchema = z.object({
  roomNumber: z.string().min(1, {
    message: "Room number is required",
  }),
  roomType: z.string({
    required_error: "Please select from accessibility options",
  }),
  price: z.string().min(1, {
    message: "Room type is required",
  }),
});

const RooomForm: React.FC<RoomFormProps> = ({ setOpen }) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roomNumber: "0",
      roomType: "",
      price: "0",
    },
  });
  async function onSubmit(values: z.infer<typeof FormSchema>) {
    const data = {
      roomNumber: values?.roomNumber ? Number(values.roomNumber) : null,
      roomType: values.roomType as RoomType,
      price: values?.price ? Number(values.roomNumber) : null,
    };
    // @ts-ignore
    const response = await createRoom(data);

    if (response.status === 200) {
      setOpen(false);
      toast.success("Successful", {
        description: "Room created successfuly",
      });
    } else {
      toast.error("Uh oh! Something went wrong.", {
        description:
          "An error occurred while making the request. Please try again later",
      });
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="roomNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Number</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder="Enter room number"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Room Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a room type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={RoomType.JuniorSuite}>
                    Junior Suite
                  </SelectItem>
                  <SelectItem value={RoomType.PresedentialSuite}>
                    Presedential Suite
                  </SelectItem>
                  <SelectItem value={RoomType.SeaView}>Sea View</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  maxLength={10}
                  placeholder="Enter room price per night"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RooomForm;
