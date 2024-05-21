import { RoomType } from "@prisma/client";

export type RoomProps = {
  id: string;
  description: string;
  roomNumber: number | null;
  image: string | null;
  roomType: RoomType;
  availability: boolean;
  bedSize: string;
  amenities: string;
  price: Decimal | null;
  createdAt: Date;
  updatedAt: Date;
};
