"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, User } from "lucide-react";
import React, { useState } from "react";
import { format } from "date-fns";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <TableActions row={row.original} />,
  },
];
