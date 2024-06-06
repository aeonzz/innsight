"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import TableActions from "./table-actions";
import TableImage from "./table-image";
import { BookingProps } from "@/types/booking";
import { format } from "date-fns";
import GuestTableActions from "./guest-table-actions";

export const columns: ColumnDef<BookingProps>[] = [
  // {
  //   accessorFn: (row) => row.guest.username,
  //   id: "username",
  //   header: "name",
  // },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <p className="text-sm text-secondary">{row.original.name}</p>
    ),
  },
  {
    accessorKey: "id",
    header: "Booking Id",
    cell: ({ row }) => (
      <p className="text-xs text-secondary">{row.original.id}</p>
    ),
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
    header: "From",
    cell: ({ row }) => {
      const newDate = new Date(row.original.fromDate);
      const checkInDate = format(newDate, "PP");

      return (
        <div>
          <p>{checkInDate}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "toDate",
    header: "To",
    cell: ({ row }) => {
      const newDate = new Date(row.original.fromDate);
      const checkOutDate = format(newDate, "PP");

      return (
        <div>
          <p>{checkOutDate}</p>
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <GuestTableActions row={row.original} />,
  },
];
