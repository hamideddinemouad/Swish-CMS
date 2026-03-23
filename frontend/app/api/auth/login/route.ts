import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

type LoginBody = {
  email?: string;
  password?: string;
};

type LoginResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

export async function POST(req: NextRequest) {
  const { email, password }: LoginBody = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post<LoginResponse>(`${env.API}/auth/login`, {
      email,
      password,
    });

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

    nextResponse.cookies.set("accessToken", response.data.accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: env.AUTH_ACCESS_TOKEN_EXPIRES_IN,
    });

    nextResponse.cookies.set("refreshToken", response.data.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
    });

    return nextResponse;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Login request failed" },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
