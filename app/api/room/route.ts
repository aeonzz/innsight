import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const rooms = await prisma.room.findMany({
      where: {
        deleted: false,
      },
      orderBy: {
        createdAt: "asc",
      },
    });
    return NextResponse.json(
      {
        data: rooms,
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
