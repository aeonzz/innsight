"use client";

import React from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BookForm from "../forms/book-form";
import { RoomProps } from "@/types/room";
import { BookingProps } from "@/types/booking";

interface BookRoomScreenProps {
  roomId: string;
  currentUserId: string;
}

const BookRoomScreen: React.FC<BookRoomScreenProps> = ({
  roomId,
  currentUserId,
}) => {
  const router = useRouter();
  return (
    <div className="w-full h-full space-y-6">
      <div className="flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          className="text-secondary"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h3 className="text-3xl font-semibold text-secondary">Book Room</h3>
      </div>
      <BookForm roomId={roomId} currentUsrId={currentUserId}  />
    </div>
  );
};

export default BookRoomScreen;
