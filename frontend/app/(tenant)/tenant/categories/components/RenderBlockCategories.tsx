"use client";

import dynamic from "next/dynamic";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";
import PageSectionFrame from "../../components/PageSectionFrame";

const components = {
  hero: dynamic(() => import("./Hero")),
  categoryGrid: dynamic(() => import("./CategoryGrid")),
  featuredCollections: dynamic(() => import("./FeaturedCollections")),
  resourceLinks: dynamic(() => import("./ResourceLinks")),
  newsletter: dynamic(() => import("./Newsletter")),
};

type BlockKey = keyof CategoriesData;

export default function RenderBlockCategories({
  blockKey,
  data,
  preferences,
}: {
  blockKey: BlockKey;
  data: CategoriesData;
  preferences: CategoriesPreferences;
}) {
  switch (blockKey) {
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "categoryGrid": {
      const CategoryGridBlock = components.categoryGrid;
      return (
        <PageSectionFrame>
          <CategoryGridBlock
            key={blockKey}
            {...data.categoryGrid}
            preferences={preferences}
          />
        </PageSectionFrame>
      );
    }
    case "featuredCollections": {
      const FeaturedCollectionsBlock = components.featuredCollections;
      return (
        <PageSectionFrame>
          <FeaturedCollectionsBlock key={blockKey} {...data.featuredCollections} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "resourceLinks": {
      const ResourceLinksBlock = components.resourceLinks;
      return (
        <PageSectionFrame>
          <ResourceLinksBlock
            key={blockKey}
            {...data.resourceLinks}
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
