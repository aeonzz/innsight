"use client";

import React, { useState } from "react";
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
import { createRoom, updateRoom } from "@/lib/actions/room.actions";
import { toast } from "sonner";
import { SingleImageDropzone } from "../ui/single-image";
import { useEdgeStore } from "@/lib/edgestore";
import { useQueryClient } from "@tanstack/react-query";
import { RoomProps } from "@/types/room";

interface RoomFormProps {
  setOpen: (state: boolean) => void;
  formData?: RoomProps | null;
}

const FormSchema = z.object({
  roomNumber: z
    .string()
    .min(1, {
      message: "Room number is required",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Room number must be a number" }),
  roomType: z.string({
    required_error: "Please select from type options",
  }),
  price: z
    .string()
    .min(1, {
      message: "Room price is required",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Price must be a number" }),
  description: z.string().min(1, {
    message: "Description is required",
  }),
  bedSize: z
    .string()
    .min(1, {
      message: "Bed size is required",
    })
    .transform((val) => Number(val))
    .refine((val) => !isNaN(val), { message: "Bed size must be a number" }),
  amenities: z.string().min(1, {
    message: "Description is required",
  }),
  bedType: z.string().min(1, {
    message: "Bed Type is required",
  }),
  roomFloor: z.string().min(1, {
    message: "Room floor is required",
  }),
});

const RooomForm: React.FC<RoomFormProps> = ({ setOpen, formData }) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const { edgestore } = useEdgeStore();
  const [file, setFile] = useState<File>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      roomNumber: formData?.roomNumber ? formData.roomNumber : 0,
      // @ts-ignore
      price: String(formData?.price) ?? undefined,
      // @ts-ignore
      bedSize: String(formData?.bedSize) ?? undefined,
      amenities: formData?.amenities ?? undefined,
      description: formData?.description ?? undefined,
      bedType: formData?.bedType ?? undefined,
      roomFloor: formData?.roomFloor ?? undefined,
    },
  });

  const processRoomResponse = (response: any) => {
    setIsLoading(false);

    if (response.status === 200) {
      setOpen(false);
      toast.success("Successful", {
        description: formData
          ? "Room updated successfully"
          : "Room added successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["rooms-data"] });
    } else if (response.status === 409) {
      toast.warning("Uh oh! Something went wrong.", {
        description: "Room number already exists",
      });
    } else {
      toast.error("Uh oh! Something went wrong.", {
        description:
          "An error occurred while making the request. Please try again later",
      });
    }
  };

  async function onSubmit(values: z.infer<typeof FormSchema>) {
    setIsLoading(true);

    let res;
    if (file) {
      try {
        res = await edgestore.publicImages.upload({
          file,
        });
      } catch (error) {
        toast.error("Uh oh! Something went wrong.", {
          description: "Could not upload photo, Try again later.",
        });
        return;
      }
    }

    const data = {
      ...values,
      roomType: values.roomType as RoomType,
      image: res?.url,
      ...(formData && { roomId: formData.id }),
    };
    // @ts-ignore
    const response = formData ? await updateRoom(data) : await createRoom(data);

    processRoomResponse(response);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <div className="flex w-full space-x-3">
          <FormField
            control={form.control}
            name="roomNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
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
            name="price"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="Enter room price per night"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full space-x-3">
          <FormField
            control={form.control}
            name="bedSize"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bed size</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Enter room bed size"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amenities"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Amenities</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Enter room amenities"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full space-x-3">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="Enter room description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bedType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Bed Type</FormLabel>
                <FormControl>
                  <Input placeholder="Enter bed type" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full space-x-3">
          <FormField
            control={form.control}
            name="roomType"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Room Type</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
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
            name="roomFloor"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Room Floor</FormLabel>
                <FormControl>
                  <Input placeholder="Enter room floor" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <SingleImageDropzone
            width={150}
            height={150}
            value={file}
            onChange={(file) => {
              setFile(file);
            }}
          />
        </div>
        <Button disabled={isLoading} type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default RooomForm;
