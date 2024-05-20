"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Button } from "./button";

const Logout = () => {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/auth`,
        })
      }
      className="border-none"
    >
      <LogOut className=" h-5 w-5" />
    </Button>
  );
};

export default Logout;
