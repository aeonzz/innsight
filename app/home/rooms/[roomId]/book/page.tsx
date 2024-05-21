import NotFound from "@/app/not-found";
import BookRoomScreen from "@/components/screens/book-room-screen";
import FetchDataError from "@/components/ui/fetch-data-error";
import { getRoomById, getRooms } from "@/lib/actions/room.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    roomId: string;
  };
}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth");
  }

  const currentUser = await getUserById(session.user.id);
  if (!currentUser.data || currentUser.error) {
    return <FetchDataError />;
  }

  const room = await getRoomById(params.roomId)
  if (room.data?.availability === false) {
    return <NotFound />
  }

  return (
    <section className="flex h-screen w-full items-center justify-center z-50 p-7">
      <BookRoomScreen
        roomId={params.roomId}
        currentUserId={currentUser.data.id}
      />
    </section>
  );
};

export default page;
