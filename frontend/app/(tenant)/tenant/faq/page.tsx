import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
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
          <RenderBlockFaq
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

