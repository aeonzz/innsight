import prisma from "@/lib/db";
import { NextResponse } from "next/server";

interface Context {
  params: {
    userId: string;
  };
}

export async function GET(req: Request, params: Context) {
  const { userId } = params.params;

  try {
    const roomBooked = await prisma.booking.findMany({
      where: {
        guestid: userId,
        confirmed: true,
      },
      include: {
        room: true,
        guest: true,
      },
    });

    return NextResponse.json({ data: roomBooked }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "could not get post" },
      { status: 500 }
    );
  }
}
