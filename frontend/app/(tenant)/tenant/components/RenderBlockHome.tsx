"use client";

import dynamic from "next/dynamic";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

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
        <FeaturedStoriesBlock
          key={blockKey}
          {...data.featuredStories}
          preferences={preferences}
        />
      );
    }
    case "offerings": {
      const OfferingsBlock = components.offerings;
      return <OfferingsBlock key={blockKey} {...data.offerings} />;
    }
    case "testimonials": {
      const TestimonialsBlock = components.testimonials;
      return (
        <TestimonialsBlock
          key={blockKey}
          {...data.testimonials}
          preferences={preferences}
        />
      );
    }
    case "newsletter": {
      const NewsletterBlock = components.newsletter;
      return <NewsletterBlock key={blockKey} {...data.newsletter} />;
    }
    default:
      return null;
  }
}
