import FetchDataError from "@/components/ui/fetch-data-error";
import { getUserById } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth";
import { Role } from "@prisma/client";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import bg from "@/public/441878683_969706121316541_6659600609965985987_n.jpg";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import DashboardMenu from "@/components/shared/dashboard-menu";
import NotFound from "@/app/not-found";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  const currentUser = await getUserById(session.user.id);
  if (!currentUser.data || currentUser.error) {
    return <FetchDataError />;
  }

  if (currentUser.data.role !== Role.ADMIN) {
    return <NotFound />;
  }

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
      <Card className="rounded-xl z-50 w-[99%] h-[95%] flex border-2 border-secondary">
        <DashboardMenu />
        {children}
        </Card>
    </main>
  );
}
