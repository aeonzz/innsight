"use client";

import React from "react";
import { Card } from "../ui/card";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { RoomProps } from "@/types/room";
import { LoaderCircle } from "lucide-react";
import FetchDataError from "../ui/fetch-data-error";

interface DataProps {
  bookedRoomsCount: number;
  roomsCount: number;
  availableRoomsCount: number;
}

const RoomBookedScreen = () => {
  const { data, isLoading, isError } = useQuery<DataProps>({
    queryFn: async () => {
      const response = await axios.get("/api/booking/booking-count");
      return response.data.data;
    },
    queryKey: ["rooms-count-data"],
  });

  return (
    <div className="w-full p-3 flex flex-col space-y-6">
      <h2 className="font-semibold text-4xl text-secondary">Room Status</h2>

      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderCircle className="animate-spin text-secondary" />
        </div>
      ) : isError ? (
        <FetchDataError />
      ) : (
        <Card className="border-2 bg-secondary flex justify-around py-6">
          <div className="w-48 h-52 bg-red-500 rounded-3xl flex flex-col items-center justify-center space-y-16 px-3">
            <h3 className="font-semibold text-2xl text-secondary">
              Total Rooms
            </h3>
            <span className="text-secondary text-3xl">{data?.roomsCount}</span>
          </div>
          <div className="w-48 h-52 bg-slate-600 rounded-3xl flex flex-col items-center justify-center space-y-10 px-3">
            <h3 className="font-semibold text-2xl text-secondary text-center">
              Available Rooms
            </h3>
            <span className="text-secondary text-3xl">{data?.availableRoomsCount}</span>
          </div>
          <div className="w-48 h-52 bg-slate-400 rounded-3xl flex flex-col items-center justify-center space-y-10 px-3">
            <h3 className="font-semibold text-2xl text-secondary text-center">
              Booked Rooms
            </h3>
            <span className="text-secondary text-3xl">{data?.bookedRoomsCount}</span>
          </div>
        </Card>
      )}
    </div>
  );
};

export default RoomBookedScreen;
