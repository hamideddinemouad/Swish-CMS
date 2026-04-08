import { env } from "@/lib/env";
import axios, { isAxiosError } from "axios";
import { access } from "fs";
import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
    // const cookieStore = await cookies();
    // const accessToken =  (await cookies()).get('accessToken')?.value;
    const accessToken = req.cookies.get("accessToken")?.value;
    if (!accessToken) {
        return NextResponse.json({
            message: "no access TOken"
        })
    }
    try {
        const res = axios.get(`${env.API}/auth/greeting`, {
            headers: {
                Cookie: `accessToken=${accessToken}`
            }
        });
        return NextResponse.json({
            message: (await res).data,
            status : 200
        })

    } catch (error) {
        if(isAxiosError(error)){
            return NextResponse.json({message : error.response?.data,
                status : error.status
            })
        }
        return NextResponse.json({message : "error", 
            status : 500
        })
    }
}