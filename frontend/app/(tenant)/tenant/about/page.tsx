import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
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
          <RenderBlockAbout
            key={`${component.type}-${component.variant ?? "default"}-${index}`}
            blockKey={component.type as keyof AboutData}
            data={response.data.data}
            preferences={response.data.preference}
          />
        );
      })}
    </main>
  );
}
