import NotFound from "@/app/not-found";
import { Card } from "@/components/ui/card";
import FetchDataError from "@/components/ui/fetch-data-error";
import { getUserById } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  const currentUser = await getUserById(session.user.id);

  if (!currentUser.data) {
    return <NotFound />;
  }

  if (currentUser.error) {
    return <FetchDataError />;
  }

  return (
    <Card className="z-50 w-[60%] h-[55%] flex items-center justify-center flex-col space-y-4 p-16">
      <h3 className="text-6xl text-center text-secondary text-yellow-500">
        Effortless Hotel Booking Management
      </h3>
      <p className="text-normal text-secondary text-center">
        This system makes booking a breeze for you and your guests. Manage
        reservations, payments, and guest communication - all in one place. Save
        time and focus on delivering great hospitality.
      </p>
    </Card>
  );
};

export default page;
