import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

interface RegisterRequest {
  username: string;
  password: string;
  name: string;
}

export async function POST(request: Request) {
  try {
    const body: RegisterRequest = await request.json();

    const { username, password, name } = body;

    // Validate fields
    if (!username || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser)
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });

    return NextResponse.json({ message: "User created successfully" });
  } catch (error: any) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
