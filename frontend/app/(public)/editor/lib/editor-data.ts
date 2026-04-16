import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import type { AvailablePage, EditorIdentity, PageConfig } from "./types";

type HomePageResponse = PageConfig & {
  data: {
    nav: {
      logo: string;
      links: Array<{ label: string; slug: string }>;
      cta?: {
        label: string;
        slug: string;
      };
    };
  };
};

export async function loadEditorPageData(pageName: string) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  const meResponse = await axios.get<EditorIdentity>(`${env.API}/users/update-user-info`, {
    headers: { Cookie: `accessToken=${accessToken}` },
  });

  const subdomain = meResponse.data.tenantSubdomain;

  if (!subdomain) {
    redirect("/setup");
  }

  const [homeResponse, pageResponse, pagesResponse] = await Promise.all([
    axios.get<HomePageResponse>(
      `${env.API}/pages/${encodeURIComponent(subdomain)}/home`,
    ),
    axios.get<PageConfig>(
      `${env.API}/pages/${encodeURIComponent(subdomain)}/${encodeURIComponent(pageName)}`,
    ),
    axios.get<AvailablePage[]>(`${env.API}/pages/by-subdomain`, {
      params: { subdomain },
    }),
  ]);

  return {
    pageName,
    homePage: homeResponse.data,
    currentPage: pageResponse.data,
    pages: pagesResponse.data,
  };
}
