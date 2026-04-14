import { headers } from "next/headers";
import { resolvePageCanvasClass } from "@/lib/page-design-presets";
import { fetchTenantPage } from "@/lib/tenant-pages";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";
import RenderBlockAbout from "./components/RenderBlockAbout";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: AboutData;
  preference: AboutPreferences;
};

export default async function About() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "about";

  const page = await fetchTenantPage<PageResponse>(subdomain, pageName);
  const contentComponents = page.components.filter(
    (component) =>
      component.type !== "nav" &&
      component.type !== "footer" &&
      component.type !== "newsletter",
  );
  const canvasClass = resolvePageCanvasClass(
    page.preference,
    contentComponents[0]?.type ?? "hero",
  );

  return (
    <main className={canvasClass}>
      {contentComponents.map((component, index) => {
        if (!component.enabled) {
          return null;
        }

        return (
          <RenderBlockAbout
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as keyof AboutData}
            data={page.data}
            preferences={page.preference}
          />
        );
      })}
    </main>
  );
}
