import axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import type { CategoriesData } from "@/visualizer/demo/categories/data";
import type { CategoriesPreferences } from "@/visualizer/demo/categories/preference";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: CategoriesData;
  preference: CategoriesPreferences;
};

const components = {
  nav: dynamic(() => import("./components/Nav")),
  hero: dynamic(() => import("./components/Hero")),
  categoryGrid: dynamic(() => import("./components/CategoryGrid")),
  featuredCollections: dynamic(() => import("./components/FeaturedCollections")),
  resourceLinks: dynamic(() => import("./components/ResourceLinks")),
  newsletter: dynamic(() => import("./components/Newsletter")),
  footer: dynamic(() => import("./components/Footer")),
};

type BlockKey = keyof CategoriesData;

export default async function Categories() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "categories";

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
  data: CategoriesData,
  preferences: CategoriesPreferences,
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
    case "categoryGrid": {
      const CategoryGridBlock = components.categoryGrid;
      return (
        <CategoryGridBlock
          key={blockKey}
          {...data.categoryGrid}
          preferences={preferences}
        />
      );
    }
    case "featuredCollections": {
      const FeaturedCollectionsBlock = components.featuredCollections;
      return <FeaturedCollectionsBlock key={blockKey} {...data.featuredCollections} />;
    }
    case "resourceLinks": {
      const ResourceLinksBlock = components.resourceLinks;
      return (
        <ResourceLinksBlock
          key={blockKey}
          {...data.resourceLinks}
          preferences={preferences}
        />
      );
    }
    case "newsletter": {
      const NewsletterBlock = components.newsletter;
      return <NewsletterBlock key={blockKey} {...data.newsletter} />;
    }
    case "footer": {
      const FooterBlock = components.footer;
      return <FooterBlock key={blockKey} {...data.footer} preferences={preferences} />;
    }
    default:
      return null;
  }
}
