"use client";

import React from "react";
import { Card } from "../ui/card";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { BookingProps } from "@/types/booking";
import { LoaderCircle } from "lucide-react";
import FetchDataError from "../ui/fetch-data-error";


const DashboardScreen = () => {
  const { data, isLoading, isError } = useQuery<BookingProps[]>({
    queryFn: async () => {
      const response = await axios.get("/api/booking");
      return response.data.data;
    },
    queryKey: ["booking-chart-data"],
  });

  return (
    <div className="border w-full p-3 flex flex-col space-y-6">
      <h2 className="font-semibold text-4xl text-secondary">Dashboard</h2>
      <div className="w-full">
        <div className="grid grid-cols-4 grid-rows-1 h-24 gap-10">
          <Card className="bg-red-700 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">150</h3>
            <p>New Booking</p>
          </Card>
          <Card className="bg-red-500 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">205</h3>
            <p>Scheduled Room</p>
          </Card>
          <Card className="bg-green-500 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">45</h3>
            <p>Check-In</p>
          </Card>
          <Card className="bg-yellow-500 border-none text-secondary p-2">
            <h3 className="text-4xl font-semibold">67</h3>
            <p>Check-Out</p>
          </Card>
        </div>
      </div>
      <div className="w-full h-full bg-secondary p-3">
        <h2 className="font-semibold text-xl">Booking Chart</h2>

        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin text-secondary text-black" />
          </div>
        ) : isError ? (
          <FetchDataError />
        ) : (
          <ResponsiveContainer width="100%" height="90%">
            <AreaChart
              width={500}
              height={300}
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="bookings"
                stroke="#8884d8"
                fill="#8884d8"
                activeDot={{ r: 8 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
};

export default DashboardScreen;
