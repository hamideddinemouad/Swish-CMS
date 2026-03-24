import { NextResponse } from "next/server";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out" }, { status: 200 });

  response.cookies.delete({ name: ACCESS_TOKEN_COOKIE_NAME, path: "/" });
  response.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: "/" });

  return response;
}
