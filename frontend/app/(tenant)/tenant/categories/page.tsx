import { headers } from "next/headers";
import { resolvePageCanvasClass } from "@/lib/page-design-presets";
import { fetchTenantPage } from "@/lib/tenant-pages";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";
import RenderBlockCategories from "./components/RenderBlockCategories";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: CategoriesData;
  preference: CategoriesPreferences;
};

export default async function Categories() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "categories";

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
          <RenderBlockCategories
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as keyof CategoriesData}
            data={page.data}
            preferences={page.preference}
          />
        );
      })}
    </main>
  );
}
