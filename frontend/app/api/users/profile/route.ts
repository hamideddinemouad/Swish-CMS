import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

const ACCESS_TOKEN_COOKIE_NAME = "accessToken";

type UpdateProfileBody = {
  firstName?: string;
  lastName?: string;
};

export async function PATCH(req: NextRequest) {
  const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE_NAME)?.value;

  if (!accessToken) {
    return NextResponse.json(
      { message: "Access token is missing" },
      { status: 401 },
    );
  }

  const body = (await req.json()) as UpdateProfileBody;

  try {
    const response = await axios.patch(`${env.API}/users/update-user-info`, body, {
      headers: {
        Cookie: `${ACCESS_TOKEN_COOKIE_NAME}=${accessToken}`,
      },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Profile update failed" },
        { status: error.response?.status ?? 500 },
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
