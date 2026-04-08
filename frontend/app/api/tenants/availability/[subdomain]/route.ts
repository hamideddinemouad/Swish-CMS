import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

type AvailabilityResponse = {
  available: boolean;
};

type RouteContext = {
  params: Promise<{
    subdomain: string;
  }>;
};

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
) {
  const { subdomain } = await params;

  if (!subdomain) {
    return NextResponse.json(
      { message: "Subdomain is required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get<AvailabilityResponse>(
      `${env.API}/tenants/availability/${encodeURIComponent(subdomain)}`
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return NextResponse.json(
        error.response?.data ?? { message: "Availability request failed" },
        { status: error.response?.status ?? 500 }
      );
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
