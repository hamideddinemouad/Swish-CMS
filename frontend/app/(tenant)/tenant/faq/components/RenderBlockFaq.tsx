"use client"
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";
import dynamic from "next/dynamic";
import PageSectionFrame from "../../components/PageSectionFrame";
const components = {
  hero: dynamic(() => import("./Hero")),
  faq: dynamic(() => import("./FaqList")),
  supportLinks: dynamic(() => import("./SupportLinks")),
};

type BlockKey = keyof FAQData;

export default function RenderBlockFaq(
{blockKey, data, preferences} : {blockKey : BlockKey, data : FAQData, preferences : FAQPreferences}
) {
  switch (blockKey) {
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "faq": {
      const FaqBlock = components.faq;
      return (
        <PageSectionFrame>
          <FaqBlock key={blockKey} {...data.faq} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "supportLinks": {
      const SupportLinksBlock = components.supportLinks;
      return (
        <PageSectionFrame>
          <SupportLinksBlock key={blockKey} {...data.supportLinks} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    default:
      return null;
  }
}
