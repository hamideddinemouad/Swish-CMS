import { randomBytes } from "node:crypto";
import axios from "axios";
import { NextResponse } from "next/server";
import { env } from "@/lib/env";

type RegisterResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    tenantId: string | null;
    tenantSubdomain: string | null;
  };
};

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
const MAX_RETRY_COUNT = 5;

function createDemoIdentity() {
  const suffix = randomBytes(4).toString("hex").slice(0, 5);
  const email = `testuser${suffix}@email.com`;

  return {
    email,
    password: email,
    secretPhrase: email,
  };
}

export async function POST() {
  for (let attempt = 0; attempt < MAX_RETRY_COUNT; attempt += 1) {
    const { email, password, secretPhrase } = createDemoIdentity();

    try {
      const response = await axios.post<RegisterResponse>(`${env.API}/auth/register`, {
        firstName: "Test",
        lastName: "User",
        email,
        password,
        secretPhrase,
      });

      const nextResponse = NextResponse.json(
        {
          message: "Recruiter demo account ready",
          user: response.data.user,
        },
        { status: response.status }
      );

      nextResponse.cookies.set(ACCESS_TOKEN_COOKIE_NAME, response.data.accessToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: env.AUTH_ACCESS_TOKEN_EXPIRES_IN,
      });

      nextResponse.cookies.set(REFRESH_TOKEN_COOKIE_NAME, response.data.refreshToken, {
        httpOnly: true,
        secure: env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
      });

      return nextResponse;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          continue;
        }

        return NextResponse.json(
          error.response?.data ?? { message: "Demo account request failed" },
          { status: error.response?.status ?? 500 }
        );
      }

      return NextResponse.json(
        { message: "Internal server error" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json(
    { message: "Unable to create a fresh demo account right now. Please try again." },
    { status: 503 }
  );
}
