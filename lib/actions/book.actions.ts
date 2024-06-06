"use server";

import { BookStatus, CheckIn, RoomStatus } from "@prisma/client";
import prisma from "../db";

export async function updateCheckInStatus(
  value: CheckIn,
  id: string,
  status?: BookStatus | undefined
) {
  try {
    const booking = await prisma.booking.update({
      where: {
        id,
      },
      data: {
        checkInStatus: value,
        status,
      },
    });

    if (status) {
      await prisma.room.update({
        where: {
          id: booking.roomId,
        },
        data: {
          status: RoomStatus.AVAILABLE,
        },
      });
    }

    return { error: null, status: 200 };
  } catch (error: any) {
    return { error: error.message, status: 500 };
  }
}
