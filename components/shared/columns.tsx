"use client"

import { ColumnDef } from "@tanstack/react-table"
import {
  ArrowUpDown,
  User
} from "lucide-react"
import React, { useState } from "react"
import { format } from "date-fns"
import { Badge, badgeVariants } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Room } from "@prisma/client"
import TableActions from "./table-actions"


export const columns: ColumnDef<Room>[] = [
  {
    accessorKey: "roomType",
    header: "Room Type",
  },
  {
    accessorKey: "bedSize",
    header: "Bed Size",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => <TableActions row={row.original} />
  },
]
