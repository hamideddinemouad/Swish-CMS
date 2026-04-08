import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

type RegisterBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  secretPhrase?: string;
};

type RegisterResponse = {
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
  const { firstName, lastName, email, password, secretPhrase }: RegisterBody =
    await req.json();

  if (!firstName || !lastName || !email || !password || !secretPhrase) {
    return NextResponse.json(
      { message: "All registration fields are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post<RegisterResponse>(`${env.API}/auth/register`, {
      firstName,
      lastName,
      email,
      password,
      secretPhrase,
    });

    return NextResponse.json(
      {
        message: "Registration successful",
        user: response.data.user,
      },
      { status: response.status }
    );
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Register request failed" },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
