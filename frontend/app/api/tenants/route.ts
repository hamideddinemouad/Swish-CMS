import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

type CreateTenantBody = {
  subdomain?: string;
  name?: string;
  userId?: string;
  settings?: Record<string, unknown>;
};

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export async function POST(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 }
    );
  }

  const { subdomain, name, userId, settings }: CreateTenantBody =
    await req.json();

  if (!subdomain || !name || !userId || !settings) {
    return NextResponse.json(
      { message: "Subdomain, name, userId, and settings are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.post(`${env.API}/tenants`, {
      subdomain,
      name,
      userId,
      settings,
    }, {
      headers: {
        Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Tenant creation failed" },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
