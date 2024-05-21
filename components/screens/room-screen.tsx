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
import { Star } from "lucide-react";
import { RoomProps } from "@/types/room";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface RoomScreenProps {
  rooms: RoomProps[];
}

const RoomScreen: React.FC<RoomScreenProps> = ({ rooms }) => {
  return (
    <div className="flex items-center justify-center">
      <Carousel
        opts={{
          align: "start",
        }}
        className="w-[80%]"
      >
        <CarouselContent>
          {rooms.map((room, index) => (
            <CarouselItem key={index} className={cn("basis-1/2")}>
              <Link href={`/home/rooms/${room.id}`} className="p-1">
                <Card className="flex justify-center flex-col space-y-3 items-center p-6">
                  <div className="relative">
                  {!room.availability && (
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
                    <h2 className="text-2xl font-semibold">{room.roomType}</h2>
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
                      Php. {room.price}{" "}
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
    </div>
  );
};

export default RoomScreen;
