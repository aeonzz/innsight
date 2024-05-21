"use server";

import { RoomType } from "@prisma/client";
import prisma from "../db";

export async function createRoom({
  roomNumber,
  roomType,
  price,
  description,
  image,
  bedSize,
  amenities,
}: {
  roomNumber: number;
  roomType: RoomType;
  price: number;
  description: string;
  image?: string | undefined;
  bedSize: string;
  amenities: string;
}) {
  try {
    await prisma.room.create({
      data: {
        roomNumber,
        roomType,
        price,
        description,
        image,
        bedSize,
        amenities,
      },
    });

    return { error: null, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { error: error.message, status: 500 };
  }
}

export async function getRooms() {
  try {
    const rooms = await prisma.room.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return { data: rooms, error: null, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message, status: 500 };
  }
}

export async function getRoomById(roomId: string) {
  try {
    const room = await prisma.room.findFirst({
      where: {
        id: roomId,
      },
    });

    return { data: room, error: null, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { data: null, error: error.message, status: 500 };
  }
}

export async function bookRoom({
  userId,
  roomId,
  payment,
  name,
  phoneNumber,
  address,
  fromDate,
  toDate,
}: {
  userId: string;
  roomId: string;
  payment: number;
  name: string;
  phoneNumber: string;
  address: string;
  fromDate: Date;
  toDate: Date;
}) {
  try {
    const booking = await prisma.booking.create({
      data: {
        roomId: roomId,
        guestid: userId,
        payment,
        name,
        phoneNumber,
        address,
        fromDate,
        toDate,
      },
    });

    await prisma.room.update({
      where: {
        id: booking.roomId,
      },
      data: {
        availability: false,
      },
    });

    return { error: null, status: 200 };
  } catch (error: any) {
    console.log(error);
    return { error: error.message, status: 500 };
  }
}
