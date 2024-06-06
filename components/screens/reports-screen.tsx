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
  // const { data, isLoading, isError } = useQuery<QueryData>({
  //   queryFn: async () => {
  //     const response = await axios.get("/api/report");
  //     return response.data.data;
  //   },
  //   queryKey: ["report-data"],
  // });

  const transactionData = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data.data;
    },
    queryKey: ["transaction-data"],
  });


  return (
    <div className="w-full p-3 flex flex-col space-y-3">
      <h2 className="font-semibold text-4xl text-secondary">Reports</h2>
      <div className="w-full h-full">
        {transactionData.isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin text-secondary" />
          </div>
        ) : transactionData.isError ? (
          <FetchDataError />
        ) : (
          <div className="w-full">
            <TransactionDataTable
              columns={columns}
              data={transactionData.data}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportsScreen;
