import axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import type { ArticlesData } from "@/visualizer/demo/articles/data";
import type { ArticlesPreferences } from "@/visualizer/demo/articles/preference";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: ArticlesData;
  preference: ArticlesPreferences;
};

const components = {
  hero: dynamic(() => import("./components/Hero")),
  featuredArticles: dynamic(() => import("./components/FeaturedArticles")),
  editorialSeries: dynamic(() => import("./components/EditorialSeries")),
  categories: dynamic(() => import("./components/Categories")),
  trending: dynamic(() => import("./components/Trending")),
  authors: dynamic(() => import("./components/Authors")),
  newsletter: dynamic(() => import("./components/Newsletter")),
};

type BlockKey = keyof ArticlesData;

export default async function Articles() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "articles";

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
  data: ArticlesData,
  preferences: ArticlesPreferences,
) {
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
