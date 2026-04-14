import { headers } from "next/headers";
import { resolvePageCanvasClass } from "@/lib/page-design-presets";
import type { ContactData } from "@/visualizer/demo/contact/data";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";
import { fetchTenantPage } from "@/lib/tenant-pages";
// import RenderBlockContact from "./components/RenderBlockContact";
import RenderBlockContact from "./components/RenderBlockContact";
type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: ContactData;
  preference: ContactPreferences;
};


type BlockKey = keyof ContactData;

export default async function Contact() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "contact";

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
          <RenderBlockContact
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
