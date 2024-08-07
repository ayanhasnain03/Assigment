// /app/api/register/route.js
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    // Parse the incoming JSON request body
    const body = await request.json();
    const { username, password, name } = body;

    // Validate required fields
    if (!username || !password || !name) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
      },
    });

    // Return success response
    return NextResponse.json({ message: "User created successfully" });
  } catch (error) {
    // Log the error for debugging
    console.error("Registration Error:", error);

    // Return generic error response
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
