import { headers } from "next/headers";
import { fetchTenantPage } from "@/lib/tenant-pages";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";
import RenderBlockHome from "./components/RenderBlockHome";

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

type BlockKey = keyof HomeData;

export default async function Home() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "home";

  const page = await fetchTenantPage<PageResponse>(subdomain, pageName);
  const contentComponents = page.components.filter(
    (component) =>
      component.type !== "nav" &&
      component.type !== "footer" &&
      component.type !== "newsletter",
  );

  return (
    <main className={page.preference.theme.background}>
      {contentComponents.map((component, index) => {
        if (!component.enabled) {
          return null;
        }

        return (
          <RenderBlockHome
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as BlockKey}
            data={page.data}
            preferences={page.preference}
          />
        );
      })}
    </main>
  );
}
