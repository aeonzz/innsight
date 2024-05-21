"use client";

import React, { useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BookForm from "../forms/book-form";
import { RoomProps } from "@/types/room";
import { BookingProps } from "@/types/booking";
import { DateRange } from "react-day-picker";
import Checkout from "../ui/checkout";

interface BookRoomScreenProps {
  roomId: string;
  currentUserId: string;
}

const BookRoomScreen: React.FC<BookRoomScreenProps> = ({
  roomId,
  currentUserId,
}) => {
  const router = useRouter();
  const [checkOut, setCheckOut] = useState(false);
  const [bookingId, setBookingId] = useState<string>();

  const [date, setDate] = useState<DateRange | undefined>();
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
      <div className="flex space-x-6">
        <BookForm
          roomId={roomId}
          currentUsrId={currentUserId}
          setCheckOut={setCheckOut}
          setDate={setDate}
          date={date}
          setBookingId={setBookingId}
        />
        <div className="flex-1 bg-black/50 rounded-md p-6 space-y-3">
          <h1 className="text-3xl text-secondary">Checkout</h1>
          {checkOut && <Checkout date={date} bookingId={bookingId} roomId={roomId} />}
        </div>
      </div>
    </div>
  );
};

export default BookRoomScreen;
