import { headers } from "next/headers";
import { resolvePageCanvasClass } from "@/lib/page-design-presets";
import { fetchTenantPage } from "@/lib/tenant-pages";
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";
import RenderBlockFaq from "./components/RenderBlockFaq";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: FAQData;
  preference: FAQPreferences;
};


type BlockKey = keyof FAQData;

export default async function Faq() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "faq";

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
          <RenderBlockFaq
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
