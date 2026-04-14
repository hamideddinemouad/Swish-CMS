"use client";

import dynamic from "next/dynamic";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";
import PageSectionFrame from "../../components/PageSectionFrame";

const components = {
  hero: dynamic(() => import("./Hero")),
  featuredArticles: dynamic(() => import("./FeaturedArticles")),
  editorialSeries: dynamic(() => import("./EditorialSeries")),
  categories: dynamic(() => import("./Categories")),
  trending: dynamic(() => import("./Trending")),
  authors: dynamic(() => import("./Authors")),
  newsletter: dynamic(() => import("./Newsletter")),
};

type BlockKey = keyof ArticlesData;

export default function RenderBlockArticles({
  blockKey,
  data,
  preferences,
}: {
  blockKey: BlockKey;
  data: ArticlesData;
  preferences: ArticlesPreferences;
}) {
  switch (blockKey) {
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "featuredArticles": {
      const FeaturedArticlesBlock = components.featuredArticles;
      return (
        <PageSectionFrame>
          <FeaturedArticlesBlock
            key={blockKey}
            {...data.featuredArticles}
            preferences={preferences}
          />
        </PageSectionFrame>
      );
    }
    case "editorialSeries": {
      const EditorialSeriesBlock = components.editorialSeries;
      return (
        <PageSectionFrame>
          <EditorialSeriesBlock key={blockKey} {...data.editorialSeries} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "categories": {
      const CategoriesBlock = components.categories;
      return (
        <PageSectionFrame>
          <CategoriesBlock key={blockKey} {...data.categories} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "trending": {
      const TrendingBlock = components.trending;
      return (
        <PageSectionFrame>
          <TrendingBlock key={blockKey} {...data.trending} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "authors": {
      const AuthorsBlock = components.authors;
      return (
        <PageSectionFrame>
          <AuthorsBlock key={blockKey} {...data.authors} preferences={preferences} />
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
