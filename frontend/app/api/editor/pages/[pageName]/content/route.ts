import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export async function PATCH(
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

  const body = (await req.json()) as { data?: unknown };

  if (typeof body.data === "undefined") {
    return NextResponse.json(
      { message: "data is required" },
      { status: 400 },
    );
  }

  try {
    const response = await axios.patch(
      `${env.API}/pages/${encodeURIComponent(pageName)}/component/content`,
      {
        data: body.data,
      },
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
        error.response?.data ?? { message: "Content update failed" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
