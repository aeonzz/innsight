import RoomScreen from "@/components/screens/room-screen";
import FetchDataError from "@/components/ui/fetch-data-error";
import { getRooms } from "@/lib/actions/room.actions";
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
  if (!currentUser.data || currentUser.error) {
    return <FetchDataError />;
  }

  const rooms = await getRooms();
  if (!rooms.data || rooms.error) {
    return <FetchDataError />;
  }

  return (
    <section>
      <RoomScreen rooms={rooms.data} currentUserData={currentUser.data} />
    </section>
  );
};

export default page;
