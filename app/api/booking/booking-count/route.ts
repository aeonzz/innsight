import prisma from "@/lib/db";
import { BookStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const bookedRoomsCount = await prisma.room.count({
      where: {
        booking: {
          some: {
            status: BookStatus.ACTIVE,
          },
        },
      },
    });
    const roomsCount = await prisma.room.count({
      where: {
        deleted: false,
      },
    });
    const availableRoomsCount = await prisma.room.count({
      where: {
        booking: {
          some: {
            status: {
              in: [BookStatus.PENDING, BookStatus.COMPLETED],
            },
          },
        },
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
