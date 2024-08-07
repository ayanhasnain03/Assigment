"use server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import prisma from "@/lib/prisma";

function getTokenFromCookies(): string | null {
  const cookieStore = cookies();
  return cookieStore.get("token")?.value || null;
}

function verifyToken(token: string): { id: string } | null {
  try {
    // Decode and verify the JWT token
    return jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: string;
    };
  } catch (error) {
    return null;
  }
}

export default async function getCurrentUser() {
  const token = getTokenFromCookies();

  if (!token) {
    return null;
  }

  const decoded = verifyToken(token);

  if (!decoded || !decoded.id) {
    return null;
  }

  try {
    // Fetch the user from the database using Prisma
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
    });

    return user || null;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
