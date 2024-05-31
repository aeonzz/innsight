import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const totalUsers = await prisma.user.count();
    const totalReservations = await prisma.booking.count();
    const totalBooked = await prisma.booking.count();

    return NextResponse.json(
      { data: { totalUsers, totalReservations, totalBooked } },
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
