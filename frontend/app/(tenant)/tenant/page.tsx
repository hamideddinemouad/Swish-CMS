import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
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
          <RenderBlockHome
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as BlockKey}
            data={response.data.data}
            preferences={response.data.preference}
          />
        );
      })}
    </main>
  );
}
