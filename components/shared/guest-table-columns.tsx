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
    accessorKey: "fromDate",
    header: "Check In",
    cell: ({ row }) => {
      const newDate = new Date(row.original.fromDate);
      const checkInDate = format(newDate, "PP");
      const checkInTime = format(newDate, "pp");

      return (
        <div>
          <p>{checkInDate}</p>
          <p className="text-sm">{checkInTime}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "toDate",
    header: "Check Out",
    cell: ({ row }) => {
      const newDate = new Date(row.original.fromDate);
      const checkOutDate = format(newDate, "PP");
      const checkOutTime = format(newDate, "pp");

      return (
        <div>
          <p>{checkOutDate}</p>
          <p className="text-sm">{checkOutTime}</p>
        </div>
      );
    },
  },
  {
    accessorFn: (row) => row.room.roomType,
    id: "roomType",
    header: "Room Type",
  },
];
