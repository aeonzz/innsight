import Image from "next/image";
import React from "react";
import bg from "@/public/441878683_969706121316541_6659600609965985987_n.jpg";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      {children}
    </main>
  );
}
