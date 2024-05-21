import RoomDetailsScreen from "@/components/screens/room-details-screen";
import FetchDataError from "@/components/ui/fetch-data-error";
import { getRoomById } from "@/lib/actions/room.actions";
import React from "react";

const page = async ({
  params,
}: {
  params: {
    roomId: string;
  };
}) => {
  const room = await getRoomById(params.roomId);
  if (!room.data || room.error) {
    return <FetchDataError />;
  }

  return (
    <section className="flex h-screen w-full items-center justify-center z-50 p-7">
      <RoomDetailsScreen room={room.data} />
    </section>
  );
};

export default page;
