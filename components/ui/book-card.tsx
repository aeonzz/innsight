"use client";

import { BookingProps } from "@/types/booking";
import React from "react";
import { Card } from "./card";
import Image from "next/image";
import { Badge } from "./badge";
import { format } from "date-fns";

interface BookCardProps {
  book: BookingProps;
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
  return (
    <Card className="w-full rounded-lg p-3 flex space-x-3 mb-2">
      <Image
        src={book.room.image ?? ""}
        alt="image"
        width={130}
        height={130}
        className="object-cover rounded-sm"
      />
      <div className="w-full flex justify-between">
        <div className="flex-col space-y-1">
          <h2 className="text-xl text-secondary">{book.room.roomType}</h2>
          <Badge>Booking Id: {book.id}</Badge>
          <div>
            {book.fromDate ? (
              book.toDate ? (
                <Badge variant="secondary">
                  {format(book.fromDate, "PP")} - {format(book.toDate, "PP")}
                </Badge>
              ) : (
                <Badge variant="secondary">{format(book.toDate, "PP")}</Badge>
              )
            ) : null}
          </div>
        </div>
        <Badge className="h-fit">{book.status}</Badge>
      </div>
    </Card>
  );
};

export default BookCard;
