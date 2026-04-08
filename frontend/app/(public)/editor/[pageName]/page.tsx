
import axios from "axios";

import { env } from "@/lib/env";
import { cookies } from "next/headers";
import Nav from "./components/rendrerNav";
import PageEditorShell from "./components/PageEditorShell";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: Omit<HomeData, "nav"> & {
    nav: {
      logo: string;
      links: HomeData["nav"]["links"];
      cta?: HomeData["nav"]["cta"];
    };
  };
  preference: HomePreferences;
};

type AvailablePageResponse = Array<{
  slug: string;
  title: string;
}>;
type me = {
  sub: string;
  email: string;
  tenantId: string;
  tenantSubdomain: string;
  type: "access";
};

type EditorPageProps = {
  params: {
    pageName: string;
  };
};

export default async function EditorPage({ params }: EditorPageProps) {
  const { pageName: pageN } = await params;
  const cookie = await cookies();
  const me = await axios.get<me>(`${env.API}/users/update-user-info`, {
    headers: { Cookie: `accessToken=${cookie.get("accessToken")?.value}` },
  });
  const subdomain = me.data.tenantSubdomain;
  const [homeResponse, pageResponse, navResponse] = await Promise.all([
    axios.get<PageResponse>(
      `${env.API}/pages/${encodeURIComponent(subdomain)}/home`,
    ),
    axios.get<PageResponse>(
      `${env.API}/pages/${encodeURIComponent(subdomain)}/${encodeURIComponent(pageN)}`,
    ),
    axios.get<AvailablePageResponse>(`${env.API}/pages/by-subdomain`, {
      params: {
        subdomain,
      },
    }),
  ]);
  return (
    <main className="flex min-h-screen w-full flex-col px-4 py-4 sm:px-6 sm:py-6 lg:px-8">
      <Nav
        logo={homeResponse.data.data.nav.logo}
        cta={homeResponse.data.data.nav.cta}
        pages={navResponse.data}
        preferences={homeResponse.data.preference}
      />
      <PageEditorShell pageName={pageN} initialConfig={pageResponse.data} />
    </main>
  );
}
