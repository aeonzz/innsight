"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, LoaderCircle, Notebook, Star, Users } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import FetchDataError from "../ui/fetch-data-error";
import { TransactionDataTable } from "../shared/transaction-data-table";
import { columns } from "../shared/transaction-table-columns";

interface QueryData {
  totalUsers: number;
  totalReservations: number;
  totalBooked: number;
}

const ReportsScreen = () => {
  const { data, isLoading, isError } = useQuery<QueryData>({
    queryFn: async () => {
      const response = await axios.get("/api/report");
      return response.data.data;
    },
    queryKey: ["report-data"],
  });

  const transactionData = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data.data;
    },
    queryKey: ["transaction-data"],
  });

  console.log(transactionData.data)

  return (
    <div className="w-full p-3 flex flex-col space-y-3">
      <h2 className="font-semibold text-4xl text-secondary">Reports</h2>
      <div className="w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin text-secondary" />
          </div>
        ) : isError ? (
          <FetchDataError />
        ) : (
          <Tabs defaultValue="overview" className="w-full">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>
            <TabsContent value="overview">
              <div className="grid grid-cols-4 grid-rows-1 h-32 gap-7">
                <div className="bg-secondary flex items-center justify-between p-3">
                  <div className="flex flex-col justify-center mb-5">
                    <p className="text-4xl reak-all whitespace-pre-wrap">
                      {data?.totalUsers}
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
                      {data?.totalReservations}
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
                      {data?.totalBooked}
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
                      10000
                    </p>
                    <p className="text-xl reak-all whitespace-pre-wrap">
                      Total Reviews
                    </p>
                  </div>
                  <Star className="text-primary w-12 h-12 self-start" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="transactions">
              <TransactionDataTable
                columns={columns}
                data={transactionData.data}
              />
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
};

export default ReportsScreen;
