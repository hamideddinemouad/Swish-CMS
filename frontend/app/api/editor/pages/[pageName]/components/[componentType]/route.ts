import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ pageName: string; componentType: string }> },
) {
  const { pageName, componentType } = await params;
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 },
    );
  }

  try {
    const response = await axios.delete(
      `${env.API}/pages/${encodeURIComponent(pageName)}/components/${encodeURIComponent(componentType)}`,
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
        error.response?.data ?? { message: "Component delete failed" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
