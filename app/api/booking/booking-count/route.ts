import prisma from "@/lib/db";
import { BookStatus, RoomStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const bookedRoomsCount = await prisma.room.count({
      where: {
        status: RoomStatus.BOOKED,
        deleted: false,
      },
    });
    const roomsCount = await prisma.room.count({
      where: {
        deleted: false,
      },
    });
    const availableRoomsCount = await prisma.room.count({
      where: {
        status: RoomStatus.AVAILABLE,
        deleted: false,
      },
    });
    return NextResponse.json(
      {
        data: { bookedRoomsCount, roomsCount, availableRoomsCount },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "could not get post" },
      { status: 500 }
    );
  }
}
