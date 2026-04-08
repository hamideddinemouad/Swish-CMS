import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

type MeResponse = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  tenantId: string | null;
  tenantSubdomain: string | null;
  type: "access";
};

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

export async function GET(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 }
    );
  }

  try {
    const response = await axios.get<MeResponse>(
      `${env.API}/users/update-user-info`,
      {
        headers: {
          Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
        },
      }
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Me request failed" },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
