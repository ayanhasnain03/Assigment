import cookie from "cookie";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const isMatch = await bcrypt.compare(password, user.password!);

    if (!isMatch) {
      return NextResponse.json({ error: "Wrong password" }, { status: 400 });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "30d",
    });

    const setToken = cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 30 * 24 * 60 * 60, // 30 days
      path: "/",
    });

    return NextResponse.json(
      { message: `welcome ${user.username}` },
      {
        headers: {
          "Set-Cookie": setToken,
        },
      }
    );
  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}
