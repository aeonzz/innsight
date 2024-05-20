import Image from "next/image";
import React from "react";
import bg from "@/public/441878683_969706121316541_6659600609965985987_n.jpg";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const page = () => {
  return (
    <main className="w-full h-screen flex items-center justify-center relative">
      <Image
        src={bg}
        alt="bg"
        width={600}
        height={600}
        quality={100}
        objectFit="fill"
        className="w-full h-full object-fill absolute"
      />
      <div className="w-full h-full z-50 flex flex-col items-center justify-center space-y-24 bg-black/20">
        <h1 className="text-7xl font-semibold text-primary">
          Inn<span className="text-secondary">Sight</span>
        </h1>
        <div className="flex flex-col items-center space-y-4">
          <h2 className="text-primary text-2xl">“There is only boss, the Guest”</h2>
          <Link
            href="/home"
            className={cn(buttonVariants({ variant: "default" }))}
          >
            Get Started
          </Link>
        </div>
      </div>
    </main>
  );
};

export default page;
