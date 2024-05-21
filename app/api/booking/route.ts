import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const bookedRooms = await prisma.room.findMany({
      where: {
        availability: false,
      },
      include: {
        booking: {
          select: {
            fromDate: true,
            toDate: true,
          },
        },
      },
    });
    return NextResponse.json(
      {
        data: bookedRooms,
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
