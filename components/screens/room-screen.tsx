"use client";

import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "../ui/card";
import { staticRooms } from "@/constants/index";
import Image from "next/image";
import { Bed, LoaderCircle, Star } from "lucide-react";
import { RoomProps } from "@/types/room";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserType } from "@/types/user";
import Logout from "../ui/logout";
import { signOut } from "next-auth/react";
import { RoomStatus } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FetchDataError from "../ui/fetch-data-error";

interface RoomScreenProps {
  currentUserData: UserType;
}

const RoomScreen: React.FC<RoomScreenProps> = ({ currentUserData }) => {
  const { data, isLoading, isError } = useQuery<RoomProps[]>({
    queryFn: async () => {
      const response = await axios.get("/api/room");
      return response.data.data;
    },
    queryKey: ["home-rooms-data"],
  });

  return (
    <div className="relative flex items-center justify-center h-screen w-screen">
      <div className="absolute top-5 left-5 bg-secondary/80 px-5 py-2 w-auto rounded-full flex items-center space-x-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="https://jolfgowviyxdrvtelayh.supabase.co/storage/v1/object/public/static%20images/d2984ec4b65a8568eab3dc2b640fc58e.jpg" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <Link href="/home/profile">
              <DropdownMenuItem>Profile</DropdownMenuItem>
            </Link>
            <DropdownMenuItem
              onClick={() =>
                signOut({
                  redirect: true,
                  callbackUrl: `${window.location.origin}/auth`,
                })
              }
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href="/home/profile">
          <Bed className="text-red-500 h-8 w-8" />
        </Link>
      </div>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderCircle className="animate-spin text-secondary" />
        </div>
      ) : isError ? (
        <FetchDataError />
      ) : data?.length === 0 ? (
        <p className="text-xl text-secondary">No Rooms</p>
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-[80%]"
        >
          <CarouselContent>
            {data?.map((room, index) => (
              <CarouselItem key={index} className={cn("basis-1/2")}>
                <Link href={`/home/rooms/${room.id}`} className="p-1">
                  <Card className="flex justify-center flex-col space-y-3 items-center p-6">
                    <div className="relative">
                      {room.status === RoomStatus.BOOKED && (
                        <div className="h-[200px] w-[300px] absolute bg-black/80 flex flex-col items-center justify-center">
                          <h2 className="text-secondary text-2xl">Booked</h2>
                        </div>
                      )}
                      <Image
                        src={
                          room.image
                            ? room.image
                            : "https://jolfgowviyxdrvtelayh.supabase.co/storage/v1/object/public/static%20images/Group%2052%20(1).png"
                        }
                        alt="img"
                        width={600}
                        height={600}
                        className="w-[300px] h-[200px] object-cover"
                      />
                    </div>
                    <div className="flex flex-col items-center space-y-2 text-secondary">
                      <h2 className="text-2xl font-semibold">
                        {room.roomType}
                      </h2>
                      <div className="flex space-x-1">
                        <Star className="text-yellow-500" />
                        <Star className="text-yellow-500" />
                        <Star className="text-yellow-500" />
                        <Star className="text-yellow-500" />
                        <Star className="text-yellow-500" />
                      </div>
                      <p className="text-xl reak-all whitespace-pre-wrap">
                        {room.description}
                      </p>
                      <p className="text-2xl text-yellow-500">
                        {room.price.toLocaleString(
                          "en-US",
                          {
                            style: "currency",
                            currency: "PHP",
                          }
                        )}
                        {" "}
                        <span className="text-secondary">per night</span>
                      </p>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </div>
  );
};

export default RoomScreen;
