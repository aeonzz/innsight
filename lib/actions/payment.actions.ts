"use server";

import { RoomStatus } from "@prisma/client";
import prisma from "../db";

export async function createPayment(
  bookingId: string,
  amount: number,
  roomId: string
) {
  try {
    const payment = prisma.payment.create({
      data: {
        bookingId,
        amount,
      },
    });

    await prisma.room.update({
      where: {
        id: roomId,
      },
      data: {
        status: RoomStatus.BOOKED,
      },
    });

    await prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        confirmed: true,
      },
    });

    return { data: payment, error: null, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message, status: 500 };
  }
}
