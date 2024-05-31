"use client";

import { LoaderCircle } from "lucide-react";
import React from "react";
import FetchDataError from "../ui/fetch-data-error";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { GuestDataTable } from "../shared/guest-data-table";
import { columns } from "../shared/guest-table-columns";

const GuestsScreen = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/user");
      return response.data.data;
    },
    queryKey: ["guests-data"],
  });

  return (
    <div className="w-full p-3 flex flex-col">
      <h2 className="font-semibold text-4xl text-secondary">Guest List</h2>
      <div className="w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin text-secondary" />
          </div>
        ) : isError ? (
          <FetchDataError />
        ) : (
          <GuestDataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default GuestsScreen;
