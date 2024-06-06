import prisma from "@/lib/db";
import { SignUpValidation } from "@/lib/validations/user";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const { username, email, password } = SignUpValidation.parse(body);

  try {
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "Email already exists" },
        { status: 409 }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        email,
        password,
        username,
      },
    });

    return NextResponse.json(
      { user: newUser, message: "User created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "An internal server error occurred" },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    const guests = await prisma.booking.findMany({
      where: {
        confirmed: true,
      },
      include: {
        room: true,
        Payment: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json({ data: guests }, { status: 200 });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json(
      { message: "could not get post" },
      { status: 500 }
    );
  }
}
