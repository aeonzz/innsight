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
import { Bell, LoaderCircle, Notebook, Star, Users } from "lucide-react";
import FetchDataError from "../ui/fetch-data-error";

interface QueryData {
  totalUsers: number;
  totalReservations: number;
  totalBooked: number;
  totalRooms: number;
}

const DashboardScreen = () => {
  const userData = useQuery<QueryData>({
    queryFn: async () => {
      const response = await axios.get("/api/report");
      return response.data.data;
    },
    queryKey: ["report-data"],
  });

  const { data, isLoading, isError } = useQuery<BookingProps[]>({
    queryFn: async () => {
      const response = await axios.get("/api/booking");
      return response.data.data;
    },
    queryKey: ["booking-chart-data"],
  });

  return (
    <div className="w-full p-3 flex flex-col space-y-6">
      <h2 className="font-semibold text-4xl text-secondary">Dashboard</h2>
      {isLoading ? (
        <div className="w-full flex items-center justify-center">
          <LoaderCircle className="animate-spin text-secondary text-black" />
        </div>
      ) : isError ? (
        <FetchDataError />
      ) : (
        <div className="grid grid-cols-4 grid-rows-1 h-32 gap-7">
          <div className="bg-secondary flex items-center justify-between p-3">
            <div className="flex flex-col justify-center mb-5">
              <p className="text-4xl reak-all whitespace-pre-wrap">
                {userData.data?.totalUsers}
              </p>
              <p className="text-xl reak-all whitespace-pre-wrap">
                Total Users
              </p>
            </div>
            <Users className="text-primary w-12 h-12 self-start" />
          </div>
          <div className="bg-secondary flex items-center justify-between p-3">
            <div className="flex flex-col justify-center mb-5">
              <p className="text-4xl reak-all whitespace-pre-wrap">
                {userData.data?.totalReservations}
              </p>
              <p className="text-xl reak-all whitespace-pre-wrap">
                Total Reservations
              </p>
            </div>
            <Bell className="text-primary w-12 h-12 self-start" />
          </div>
          <div className="bg-secondary flex items-center justify-between p-3">
            <div className="flex flex-col justify-center mb-5">
              <p className="text-4xl reak-all whitespace-pre-wrap">
                {userData.data?.totalBooked}
              </p>
              <p className="text-xl reak-all whitespace-pre-wrap">
                Total Booked
              </p>
            </div>
            <Notebook className="text-primary w-12 h-12 self-start" />
          </div>
          <div className="bg-secondary flex items-center justify-between p-3">
            <div className="flex flex-col justify-center mb-5">
              <p className="text-4xl reak-all whitespace-pre-wrap">
                {userData.data?.totalRooms}
              </p>
              <p className="text-xl reak-all whitespace-pre-wrap">
                Total Rooms
              </p>
            </div>
            <Star className="text-primary w-12 h-12 self-start" />
          </div>
        </div>
      )}
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <LoaderCircle className="animate-spin text-secondary text-black" />
        </div>
      ) : isError ? (
        <FetchDataError />
      ) : (
        <div className="w-full h-full bg-secondary p-3">
          <h2 className="font-semibold text-xl">Booking Chart</h2>
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
        </div>
      )}
    </div>
  );
};

export default DashboardScreen;
