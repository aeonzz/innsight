"use server";

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
        availability: false,
      },
    });

    return { data: payment, error: null, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message, status: 500 };
  }
}
