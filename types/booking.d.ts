import { BookStatus, CheckIn, Payment, User } from "@prisma/client";
import { RoomProps } from "./room";

export type BookingProps = {
  id: string;
  guest: User;
  room: RoomProps;
  fromDate: DateTime;
  toDate: DateTime;
  name: string;
  status: BookStatus;
  createdAt: DateTime;
  checkInStatus: CheckIn;
  Payment: Payment[];
};
