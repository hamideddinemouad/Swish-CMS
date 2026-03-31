import axios from "axios";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import type { ContactData } from "@/visualizer/demo/contact/data";
import type { ContactPreferences } from "@/visualizer/demo/contact/preference";
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
          <RenderBlockContact
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
