import { Role } from "@prisma/client";

export type UserType = {
  id: string;
  username: string;
  email: string;
  role: Role;
};
