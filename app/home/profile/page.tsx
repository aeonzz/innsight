import NotFound from "@/app/not-found";
import ProfileScreen from "@/components/screens/profile-screen";
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
    <section className="flex h-screen w-full items-center justify-center z-50 p-7">
      <ProfileScreen currentUserData={currentUser.data} />
    </section>
  );
};

export default page;
