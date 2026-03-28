import axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";

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

const components = {
  nav: dynamic(() => import("./components/Nav")),
  hero: dynamic(() => import("./components/Hero")),
  faq: dynamic(() => import("./components/FaqList")),
  supportLinks: dynamic(() => import("./components/SupportLinks")),
  footer: dynamic(() => import("./components/Footer")),
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
      {contentComponents.map((component) => {
        if (!component.enabled) {
          return null;
        }

        return renderBlock(
          component.type as BlockKey,
          response.data.data,
          response.data.preference,
        );
      })}
    </main>
  );
}

function renderBlock(
  blockKey: BlockKey,
  data: FAQData,
  preferences: FAQPreferences,
) {
  switch (blockKey) {
    case "nav": {
      const NavBlock = components.nav;
      return <NavBlock key={blockKey} {...data.nav} preferences={preferences} />;
    }
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "faq": {
      const FaqBlock = components.faq;
      return <FaqBlock key={blockKey} {...data.faq} />;
    }
    case "supportLinks": {
      const SupportLinksBlock = components.supportLinks;
      return <SupportLinksBlock key={blockKey} {...data.supportLinks} />;
    }
    case "footer": {
      const FooterBlock = components.footer;
      return <FooterBlock key={blockKey} {...data.footer} preferences={preferences} />;
    }
    default:
      return null;
  }
}
