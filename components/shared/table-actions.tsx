"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { MoreHorizontal, Pencil, Trash } from "lucide-react";
import { Room } from "@prisma/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import RooomForm from "../forms/room-form";
import { RoomProps } from "@/types/room";
import { deleteRoom } from "@/lib/actions/room.actions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface TableActionsProps {
  row: RoomProps;
}

const TableActions: React.FC<TableActionsProps> = ({ row }) => {
  const [open, setOpen] = useState(false);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  async function handleDeleteRoom() {
    setIsLoading(true);

    const response = await deleteRoom(row.id);

    if (response.status === 200) {
      setIsLoading(false);
      setDropDownOpen(false);
      toast.success("Successful", {
        description: "Room deleted successfuly",
      });
      queryClient.invalidateQueries({ queryKey: ["rooms-data"] });
    } else {
      setIsLoading(false);
      toast.error("Uh oh! Something went wrong.", {
        description:
          "An error occurred while making the request. Please try again later",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu
        open={dropDownOpen}
        onOpenChange={setDropDownOpen}
        modal={false}
      >
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DialogTrigger asChild>
            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem className="text-red-600" disabled={isLoading} onClick={handleDeleteRoom}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Room</DialogTitle>
        </DialogHeader>
        <RooomForm setOpen={setOpen} formData={row} />
      </DialogContent>
    </Dialog>
  );
};

export default TableActions;
