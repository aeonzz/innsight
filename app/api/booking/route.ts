import prisma from "@/lib/db";
import { RoomStatus } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const bookings = await prisma.booking.findMany();

    const bookingsByMonth = bookings.reduce((acc, booking) => {
      const month = booking.createdAt.toISOString().slice(0, 10);
      if (!acc[month]) {
        acc[month] = 0;
      }
      acc[month]++;
      return acc;
    }, {} as Record<string, number>);

    const formattedData = Object.entries(bookingsByMonth).map(([month, count]) => ({
      name: month,
      bookings: count,
    }));

    return NextResponse.json({ data: formattedData   }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "could not get post" },
      { status: 500 }
    );
  }
}
