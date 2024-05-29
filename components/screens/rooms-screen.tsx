"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import RooomForm from "../forms/room-form";
import { DataTable } from "../shared/data-table";
import { columns } from "../shared/columns";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { LoaderCircle } from "lucide-react";
import { Room } from "@prisma/client";
import FetchDataError from "../ui/fetch-data-error";

interface RoomsScreenProps {
  currentUserId: string;
}

const RoomsScreen: React.FC<RoomsScreenProps> = ({ currentUserId }) => {
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryFn: async () => {
      const response = await axios.get("/api/room");
      return response.data.data;
    },
    queryKey: ["rooms-data"],
  });

  return (
    <div className="border w-full p-3 flex flex-col space-y-3">
      <div className="flex items-center justify-between border border-white">
        <h2 className="font-semibold text-4xl text-secondary">Rooms</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Room</Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add Room</DialogTitle>
            </DialogHeader>
            <RooomForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="w-full h-full">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center">
            <LoaderCircle className="animate-spin text-secondary" />
          </div>
        ) : isError ? (
          <FetchDataError />
        ) : (
          <DataTable columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};

export default RoomsScreen;
