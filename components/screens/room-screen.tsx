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

const RoomScreen = () => {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full"
    >
      <CarouselContent>
        {staticRooms.map((room, index) => (
          <CarouselItem key={index} className="basis-2/4">
            <div className="p-1">
              <Card className="flex justify-center flex-col space-y-3 items-center p-6">
                <Image
                  src={room.url}
                  alt="img"
                  width={300}
                  height={200}
                  className="w-full h-[200px]"
                />
                <div className="flex flex-col items-center space-y-2 text-secondary">
                  <h2 className="text-2xl font-semibold">{room.type}</h2>
                  <div className="flex space-x-1">
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                    <Star className="text-yellow-500" />
                  </div>
                  <p className="text-xl">{room.description}</p>
                  <p className="text-2xl text-yellow-500">
                    Php. {room.price}{" "}
                    <span className="text-secondary">per night </span>
                  </p>
                </div>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default RoomScreen;
