import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
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

  if (!subdomain) {
    return <div>Missing tenant context</div>;
  }

  const response = await axios.get<PageResponse>(
    `${env.API}/pages/${subdomain}/${pageName}`
  );
  const contentComponents = response.data.components.filter(
    (component) => component.type !== "nav" && component.type !== "footer",
  );

  return (
    <main>
      {contentComponents.map((component, index) => {
        if (!component.enabled) {
          return null;
        }

        return (
          <RenderBlockCategories
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as keyof CategoriesData}
            data={response.data.data}
            preferences={response.data.preference}
          />
        );
      })}
    </main>
  );
}
