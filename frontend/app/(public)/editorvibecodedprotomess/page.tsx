import axios from "axios";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { env } from "@/lib/env";
import { HomeEditorShell } from "./components/HomeEditorShell";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type PageResponse = {
  slug: string;
  title: string;
  components: Array<{ type: string; enabled: boolean; variant?: string }>;
  data: HomeData;
  preference: HomePreferences;
};

export default async function EditorPage() {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) redirect("/login");

  const me = await axios.get<{ tenantSubdomain: string | null }>(`${env.API}/auth/me`, {
    headers: { Cookie: `accessToken=${accessToken}` },
  });
  const tenantSubdomain = me.data.tenantSubdomain;

  if (!tenantSubdomain) redirect("/setup");

  const response = await axios.get<PageResponse>(
    `${env.API}/pages/${encodeURIComponent(tenantSubdomain)}/home`,
    { headers: { Cookie: `accessToken=${accessToken}` } },
  );

  return (
    <HomeEditorShell
      pageName="home"
      initialData={response.data.data}
      initialPreference={response.data.preference}
    />
  );
}
