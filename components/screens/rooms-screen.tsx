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

const RoomsScreen = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="border w-full p-3 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-4xl text-secondary">Rooms</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>Add Room</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Room</DialogTitle>
            </DialogHeader>
            <RooomForm setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default RoomsScreen;
