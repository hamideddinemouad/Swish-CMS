import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: HomeData;
  preference: HomePreferences;
};

type AvailablePageResponse = Array<{
  slug: string;
  title: string;
}>;

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");

  if (!subdomain) {
    return <div className="min-h-screen">{children}</div>;
  }

  try {
    const [pageResponse, navResponse] = await Promise.all([
      axios.get<PageResponse>(`${env.API}/pages/${subdomain}/home`),
      axios.get<AvailablePageResponse>(`${env.API}/pages/by-subdomain`, {
        params: {
          subdomain,
        },
      }),
    ]);

    return (
      <div className="min-h-screen flex flex-col">
        <Nav
          logo={pageResponse.data.data.nav.logo}
          cta={pageResponse.data.data.nav.cta}
          pages={navResponse.data}
          preferences={pageResponse.data.preference}
        />
        <div className="flex-1">{children}</div>
        <Footer
          {...pageResponse.data.data.footer}
          preferences={pageResponse.data.preference}
        />
      </div>
    );
  } catch {
    return <div className="min-h-screen">{children}</div>;
  }
}
