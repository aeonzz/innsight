"use client";

import React from "react";
import { Button, buttonVariants } from "../ui/button";
import { BedSingle, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
  const pathname = usePathname();
  return (
    <aside className="flex flex-col items-center space-y-3 py-4 px-2 border-r-2 border-secondary rounded-xl">
      <Link href="/home" className="text-xl font-semibold text-primary">
        Inn<span className="text-secondary">Sight</span>
      </Link>
      <div className="flex flex-col space-y-1">
        <Link
          href="/dashboard"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/dashboard" && "bg-yellow-600",
            "border-none w-40 font-semibold text-secondary justify-start"
          )}
        >
          <LayoutDashboard className="mr-1 h-5 w-5 text-primary" />
          Dashboard
        </Link>
        <Link
          href="/dashboard/rooms"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/dashboard/rooms" && "bg-yellow-600",
            "border-none w-40 font-semibold text-secondary justify-start"
          )}
        >
          <BedSingle className="mr-1 h-5 w-5 text-primary" />
          Rooms
        </Link>
        <Link
          href="/dashboard/guest"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === "/dashboard/guest" && "bg-yellow-600",
            "border-none w-40 font-semibold text-secondary justify-start"
          )}
        >
          <BedSingle className="mr-1 h-5 w-5 text-primary" />
          Guest
        </Link>
      </div>
    </aside>
  );
};

export default DashboardMenu;
