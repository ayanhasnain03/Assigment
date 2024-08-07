import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";

export async function POST(request: Request) {
  const body = await request.json();

  try {
    const { name, username, password } = body;

    if (!name || !username || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // Hash the password
    const hashPassword = await bcrypt.hash(password, 12);

    // Create the new user
    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: hashPassword,
      },
    });

    // // Generate a JWT token
    // const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string, {
    //   expiresIn: "30d",
    // });

    // // Set the JWT token in a cookie
    // return NextResponse.json(user, {
    //   headers: {
    //     "Set-Cookie": cookie.serialize("token", token, {
    //       httpOnly: true, // Cookie is only accessible by the server
    //       secure: process.env.NODE_ENV === "production",
    //       maxAge: 30 * 24 * 60 * 60, // 30 days
    //       path: "/",
    //     }),
    //   },
    // });
    return NextResponse.json({
      message: {
        success: "Account created successfully",
      },
    });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
