import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
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
          <RenderBlockArticles
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as keyof ArticlesData}
            data={response.data.data}
            preferences={response.data.preference}
          />
        );
      })}
    </main>
  );
}
