import axios from "axios";
import { writeFile } from "node:fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { env } from "@/lib/env";

//this will call the nestjs api for the required jsons
//it will get subdomain from request headers proxy already sets this up and page accessed
//it will call nestjs to bring out data for the subdomain data will be 3 big objects
//one that has truthy and falsy values for components existing in page
//one to hydrate the components with user related data
//one for styling preferences in tailwind
//this route will be called on the routed to page by proxy
//it will take those objects and decide how to consume them

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
    //add id 
  }>;
  data: Record<string, unknown>;
  preference: Record<string, unknown>;
};

export async function GET(req: NextRequest) {
  const subdomain = req.headers.get("x-subdomain");
  const pageName = req.headers.get("x-page");

  if (!subdomain || !pageName) {
    return NextResponse.json(
      { message: "Subdomain and page name are required" },
      { status: 400 }
    );
  }

  try {
    const response = await axios.get<PageResponse>(
      `${env.API}/pages/${encodeURIComponent(subdomain)}/${encodeURIComponent(pageName)}`
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log( error.response?.data ?? { message: "Page request failed" },)
      return NextResponse.redirect("/not-found");  
    }
    
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
