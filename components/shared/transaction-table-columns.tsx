"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import TableActions from "./table-actions";
import TableImage from "./table-image";
import { BookingProps } from "@/types/booking";
import { format } from "date-fns";

export const columns: ColumnDef<BookingProps>[] = [
  // {
  //   accessorFn: (row) => row.guest.username,
  //   id: "username",
  //   header: "name",
  // },
  {
    accessorFn: (row) => row.Payment[0].id,
    id: "bookingId",
    header: "Transaction Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "createdAt",
    header: "Date Order",
    cell: ({ row }) => {
      const newDate = new Date(row.original.createdAt);
      const orderDate = format(newDate, "PP");
      const orderTime = format(newDate, "pp");

      return (
        <div>
          <p>{orderDate}</p>
          <p className="text-sm">{orderTime}</p>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.room.roomType,
    id: "roomType",
    header: "Room Type",
  },
  {
    accessorFn: (row) => row.Payment[0].amount,
    id: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return (
        <p className="text-md text-yellow-500 inline-flex flex-col">
          {row.original.Payment[0].amount.toLocaleString("en-US", {
            style: "currency",
            currency: "PHP",
          })}
          <span className="text-secondary">per night</span>
        </p>
      );
    },
  },
];
