"use client";

import React from "react";
import { Card } from "../ui/card";
import { ArrowLeft } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { RoomProps } from "@/types/room";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { RoomStatus } from "@prisma/client";

interface RoomDetailsScreenProps {
  room: RoomProps;
}

const RoomDetailsScreen: React.FC<RoomDetailsScreenProps> = ({ room }) => {
  const router = useRouter();
  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-secondary"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h3 className="text-3xl font-semibold text-secondary">
          {room.roomType}
        </h3>
      </div>
      <Card className="w-full h-auto p-8 flex flex-col space-y-10 items-center">
        <div className="flex space-x-10 w-full">
          <div className="relative">
            {room.status === RoomStatus.BOOKED && (
              <div className="h-[350px] w-full absolute bg-black/80 flex flex-col items-center justify-center">
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
              className="h-[350px] aspect-square object-cover"
            />
          </div>
          <div className="space-y-9">
            <h2 className="text-4xl text-secondary break-all whitespace-pre-wrap">
              Price: <span className="text-yellow-500">Php. {room.price}</span>
            </h2>
            <h2 className="text-4xl text-secondary break-all whitespace-pre-wrap">
              Room Number: {room.roomNumber}
            </h2>
            <h2 className="text-4xl text-secondary break-all whitespace-pre-wrap">
              Bed Size: {room.bedSize} inches
            </h2>
            <h2 className="text-4xl text-secondary break-all whitespace-pre-wrap">
              Amenities: {room.amenities}
            </h2>
          </div>
        </div>
        {room.status === RoomStatus.AVAILABLE && (
          <Link
            href={`/home/rooms/${room.id}/book?price=${room.price}`}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Book Now
          </Link>
        )}
      </Card>
    </div>
  );
};

export default RoomDetailsScreen;
