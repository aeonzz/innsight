import React from "react";
import { Card } from "../ui/card";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { UserType } from "@/types/user";
import Logout from "../ui/logout";

interface HomeScreenProps {
  currentUser: UserType;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ currentUser }) => {
  return (
    <Card className="z-50 w-[60%] h-[55%] flex items-center justify-center flex-col space-y-16">
      <div className="flex flex-col items-center space-y-5">
        <h1 className="text-8xl font-semibold text-secondary">WELCOME</h1>
        <p className="text-xl text-secondary inline-flex gap-1">
          {currentUser.username}
          <Logout />
        </p>
      </div>
      <nav>
        <ul>
          <Link
            href=""
            className={cn(
              buttonVariants({ variant: "link" }),
              "border-none text-secondary text-lg w-32"
            )}
          >
            About
          </Link>
          <Link
            href="/home/rooms"
            className={cn(
              buttonVariants({ variant: "link" }),
              "border-none text-secondary text-lg w-32"
            )}
          >
            Book Room
          </Link>
          <Link
            href=""
            className={cn(
              buttonVariants({ variant: "link" }),
              "border-none text-secondary text-lg w-32"
            )}
          >
            Contact Us
          </Link>
        </ul>
      </nav>
    </Card>
  );
};

export default HomeScreen;
