import axios from "axios";
import dynamic from "next/dynamic";
import { headers } from "next/headers";
import { env } from "@/lib/env";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

type PageResponse = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: AboutData;
  preference: AboutPreferences;
};

const components = {
  hero: dynamic(() => import("./components/Hero")),
  mission: dynamic(() => import("./components/Mission")),
  values: dynamic(() => import("./components/Values")),
  timeline: dynamic(() => import("./components/Timeline")),
  team: dynamic(() => import("./components/Team")),
  stats: dynamic(() => import("./components/Stats")),
  testimonials: dynamic(() => import("./components/Testimonials")),
};

type BlockKey = keyof AboutData;

export default async function About() {
  const requestHeaders = await headers();
  const subdomain = requestHeaders.get("x-subdomain");
  const pageName = "about";

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
  data: AboutData,
  preferences: AboutPreferences,
) {
  switch (blockKey) {
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "mission": {
      const MissionBlock = components.mission;
      return <MissionBlock key={blockKey} {...data.mission} preferences={preferences} />;
    }
    case "values": {
      const ValuesBlock = components.values;
      return <ValuesBlock key={blockKey} {...data.values} preferences={preferences} />;
    }
    case "timeline": {
      const TimelineBlock = components.timeline;
      return <TimelineBlock key={blockKey} {...data.timeline} preferences={preferences} />;
    }
    case "team": {
      const TeamBlock = components.team;
      return <TeamBlock key={blockKey} {...data.team} preferences={preferences} />;
    }
    case "stats": {
      const StatsBlock = components.stats;
      return <StatsBlock key={blockKey} {...data.stats} preferences={preferences} />;
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
    default:
      return null;
  }
}
