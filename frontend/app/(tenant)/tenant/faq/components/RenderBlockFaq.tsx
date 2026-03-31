"use client"
import type { FAQData } from "@/visualizer/demo/FAQ/data";
import type { FAQPreferences } from "@/visualizer/demo/FAQ/preference";
import dynamic from "next/dynamic";
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
      return <FaqBlock key={blockKey} {...data.faq} />;
    }
    case "supportLinks": {
      const SupportLinksBlock = components.supportLinks;
      return <SupportLinksBlock key={blockKey} {...data.supportLinks} />;
    }
    default:
      return null;
  }
}