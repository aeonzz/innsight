"use client";

import { ColumnDef } from "@tanstack/react-table";
import React, { useState } from "react";
import { Room } from "@prisma/client";
import TableActions from "./table-actions";
import TableImage from "./table-image";

export const columns: ColumnDef<Room>[] = [
  {
    id: "image",
    cell: ({ row }) => <TableImage row={row.original} />,
  },
  {
    accessorKey: "roomType",
    header: "Room Type",
  },
  {
    accessorKey: "bedType",
    header: "Bed Type",
  },
  {
    accessorKey: "roomFloor",
    header: "Room Floor",
  },
  {
    accessorKey: "roomNumber",
    header: "Room Number",
  },
  {
    accessorKey: "status",
    header: "Room Status",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <TableActions row={row.original} />,
  },
];
