"use client";

import dynamic from "next/dynamic";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

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
        <FeaturedArticlesBlock
          key={blockKey}
          {...data.featuredArticles}
          preferences={preferences}
        />
      );
    }
    case "editorialSeries": {
      const EditorialSeriesBlock = components.editorialSeries;
      return <EditorialSeriesBlock key={blockKey} {...data.editorialSeries} />;
    }
    case "categories": {
      const CategoriesBlock = components.categories;
      return <CategoriesBlock key={blockKey} {...data.categories} />;
    }
    case "trending": {
      const TrendingBlock = components.trending;
      return <TrendingBlock key={blockKey} {...data.trending} />;
    }
    case "authors": {
      const AuthorsBlock = components.authors;
      return <AuthorsBlock key={blockKey} {...data.authors} />;
    }
    case "newsletter": {
      const NewsletterBlock = components.newsletter;
      return <NewsletterBlock key={blockKey} {...data.newsletter} />;
    }
    default:
      return null;
  }
}
