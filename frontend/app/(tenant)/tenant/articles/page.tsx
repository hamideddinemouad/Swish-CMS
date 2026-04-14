import { headers } from "next/headers";
import { resolvePageCanvasClass } from "@/lib/page-design-presets";
import { fetchTenantPage } from "@/lib/tenant-pages";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";
import RenderBlockArticles from "./components/RenderBlockArticles";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: ArticlesData;
  preference: ArticlesPreferences;
};

export default async function Articles() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "articles";

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
          <RenderBlockArticles
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as keyof ArticlesData}
            data={page.data}
            preferences={page.preference}
          />
        );
      })}
    </main>
  );
}
