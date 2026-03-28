import axios from "axios";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import { env } from "@/lib/env";
import type { HomeData } from "@/visualizer/demo/home/data";
import type { HomePreferences } from "@/visualizer/demo/home/preference";

type PageResponse = {
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
  nav: dynamic(() => import("./components/Nav")),
  hero: dynamic(() => import("./components/Hero")),
  featuredStories: dynamic(() => import("./components/FeaturedStories")),
  offerings: dynamic(() => import("./components/Offerings")),
  testimonials: dynamic(() => import("./components/Testimonials")),
  newsletter: dynamic(() => import("./components/Newsletter")),
  footer: dynamic(() => import("./components/Footer")),
};

type BlockKey = keyof HomeData;

export default async function Home() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "home";
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
  data: HomeData,
  preferences: HomePreferences,
) {
  switch (blockKey) {
    case "nav":
      {
        const NavBlock = components.nav;
        return <NavBlock key={blockKey} {...data.nav} preferences={preferences} />;
      }
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
    case "footer":
      {
        const FooterBlock = components.footer;
        return <FooterBlock key={blockKey} {...data.footer} preferences={preferences} />;
      }
    default:
      return null;
  }
}
