"use client";

import dynamic from "next/dynamic";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";
import PageSectionFrame from "./PageSectionFrame";

const components = {
  hero: dynamic(() => import("./Hero")),
  featuredStories: dynamic(() => import("./FeaturedStories")),
  offerings: dynamic(() => import("./Offerings")),
  testimonials: dynamic(() => import("./Testimonials")),
  newsletter: dynamic(() => import("./Newsletter")),
};

type BlockKey = keyof HomeData;

export default function RenderBlockHome({
  blockKey,
  data,
  preferences,
}: {
  blockKey: BlockKey;
  data: HomeData;
  preferences: HomePreferences;
}) {
  switch (blockKey) {
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "featuredStories": {
      const FeaturedStoriesBlock = components.featuredStories;
      return (
        <PageSectionFrame>
          <FeaturedStoriesBlock
            key={blockKey}
            {...data.featuredStories}
            preferences={preferences}
          />
        </PageSectionFrame>
      );
    }
    case "offerings": {
      const OfferingsBlock = components.offerings;
      return (
        <PageSectionFrame>
          <OfferingsBlock key={blockKey} {...data.offerings} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "testimonials": {
      const TestimonialsBlock = components.testimonials;
      return (
        <PageSectionFrame>
          <TestimonialsBlock
            key={blockKey}
            {...data.testimonials}
            preferences={preferences}
          />
        </PageSectionFrame>
      );
    }
    case "newsletter": {
      const NewsletterBlock = components.newsletter;
      return (
        <PageSectionFrame>
          <NewsletterBlock key={blockKey} {...data.newsletter} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    default:
      return null;
  }
}
