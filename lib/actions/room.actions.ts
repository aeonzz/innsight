"use server";

import { RoomType } from "@prisma/client";
import prisma from "../db";

export async function createRoom({
  roomNumber,
  roomType,
  price,
}: {
  roomNumber: number;
  roomType: RoomType;
  price: number;
}) {
  try {
    await prisma.room.create({
      data: {
        roomNumber,
        roomType,
        price,
      },
    });

    return { error: null, status: 200 };
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}
