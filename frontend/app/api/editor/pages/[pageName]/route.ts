import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

async function getTenantSubdomain(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return null;
  }

  try {
    const response = await axios.get<{ tenantSubdomain: string | null }>(
      `${env.API}/auth/me`,
      {
        headers: {
          Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
        },
      },
    );

    return response.data.tenantSubdomain;
  } catch {
    return null;
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pageName: string }> },
) {
  const { pageName } = await params;
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;
  const tenantSubdomain = await getTenantSubdomain(req);

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 },
    );
  }

  if (!tenantSubdomain) {
    return NextResponse.json(
      { message: "Tenant context is missing" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.get(
      `${env.API}/pages/${encodeURIComponent(tenantSubdomain)}/${encodeURIComponent(pageName)}`,
      {
        headers: {
          Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Page request failed" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ pageName: string }> },
) {
  const { pageName } = await params;
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 },
    );
  }

  try {
    const response = await axios.delete(
      `${env.API}/pages/by-name/${encodeURIComponent(pageName)}`,
      {
        headers: {
          Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Delete request failed" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
