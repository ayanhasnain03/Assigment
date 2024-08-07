import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("token", "", {
    maxAge: 0,
    path: "/",
  });

  return response;
}
