import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

type RefreshResponse = {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
};

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";
const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";
const DEFAULT_REDIRECT_PATH = "/dashboard";
const LOGIN_PATH = "/login";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { message: "Refresh token is missing" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.post<RefreshResponse>(
      `${env.API}/auth/refresh`,
      undefined,
      {
        headers: {
          Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`,
        },
      }
    );

    const nextResponse = NextResponse.json(response.data, {
      status: response.status,
    });

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
      return NextResponse.json(
        error.response?.data ?? { message: "Refresh request failed" },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const refreshToken = req.cookies.get(REFRESH_TOKEN_COOKIE_NAME)?.value;
  const next = req.nextUrl.searchParams.get("next");
  const safeNext =
    next && next.startsWith("/") && !next.startsWith("//")
      ? next
      : DEFAULT_REDIRECT_PATH;

  if (!refreshToken) {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, req.url));

    response.cookies.delete({ name: ACCESS_TOKEN_COOKIE_NAME, path: "/" });
    response.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: "/" });

    return response;
  }

  try {
    const refreshResponse = await axios.post<RefreshResponse>(
      `${env.API}/auth/refresh`,
      undefined,
      {
        headers: {
          Cookie: `${REFRESH_TOKEN_COOKIE_NAME}=${refreshToken}`,
        },
      }
    );

    const response = NextResponse.redirect(new URL(safeNext, req.url));

    response.cookies.set(ACCESS_TOKEN_COOKIE_NAME, refreshResponse.data.accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: env.AUTH_ACCESS_TOKEN_EXPIRES_IN,
    });

    response.cookies.set(REFRESH_TOKEN_COOKIE_NAME, refreshResponse.data.refreshToken, {
      httpOnly: true,
      secure: env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: env.AUTH_REFRESH_TOKEN_EXPIRES_IN,
    });

    return response;
  } catch {
    const response = NextResponse.redirect(new URL(LOGIN_PATH, req.url));

    response.cookies.delete({ name: ACCESS_TOKEN_COOKIE_NAME, path: "/" });
    response.cookies.delete({ name: REFRESH_TOKEN_COOKIE_NAME, path: "/" });

    return response;
  }
}
