"use client"
import dynamic from "next/dynamic";
import { env } from "@/lib/env";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

// import { useEffect, useState } from "react";
import axios from "axios";

type pageConfig = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: HomeData;
  preference: HomePreferences;
};

const components = {
  hero: dynamic(() => import("@/app/(tenant)/tenant/components/Hero")),
  featuredStories: dynamic(() => import("@/app/(tenant)/tenant/components/FeaturedStories")),
  offerings: dynamic(() => import("@/app/(tenant)/tenant/components/Offerings")),
  testimonials: dynamic(() => import("@/app/(tenant)/tenant/components/Testimonials")),
  newsletter: dynamic(() => import("@/app/(tenant)/tenant/components/Newsletter")),
};

type BlockKey = keyof HomeData;
// type sub  = {subdomain?: string};
export default function Renderer({config} : {config : pageConfig}) {
//   const requestHeaders = await headers();
//   // const subdomain = requestHeaders.get("x-subdomain");
//   subdomain ?? requestHeaders.get("x-subdomain");
//   if (!subdomain) {
//     return <div>Missing tenant context</div>;
//   }
// type: string;
//     enabled: boolean;
//     variant?: string;
const subdomain = "fefe"
  const pageName = "home";
  // const response = await axios.get<pageConfig>(
  //   `${env.API}/pages/${subdomain}/${pageName}`
  // );
  const contentComponents = config.components.filter(
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
          config.data,
          config.preference,
        );
      })}
    </main>
  );
}

function renderBlock(
  blockKey: BlockKey,
  data: HomeData,
  preferences: HomePreferences,
) {
  switch (blockKey) {
    case "hero":
      {
        const HeroBlock = components.hero;
        return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
      }
    case "featuredStories":
      {
        const FeaturedStoriesBlock = components.featuredStories;
        return (
          <FeaturedStoriesBlock
            key={blockKey}
            {...data.featuredStories}
            preferences={preferences}
          />
        );
      }
    case "offerings":
      {
        const OfferingsBlock = components.offerings;
        return <OfferingsBlock key={blockKey} {...data.offerings} />;
      }
    case "testimonials":
      {
        const TestimonialsBlock = components.testimonials;
        return (
          <TestimonialsBlock
            key={blockKey}
            {...data.testimonials}
            preferences={preferences}
          />
        );
      }
    case "newsletter":
      {
        const NewsletterBlock = components.newsletter;
        return <NewsletterBlock key={blockKey} {...data.newsletter} />;
      }
    default:
      return null;
  }
}
