"use client";

import dynamic from "next/dynamic";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";
import PageSectionFrame from "../../components/PageSectionFrame";

const components = {
  hero: dynamic(() => import("./Hero")),
  mission: dynamic(() => import("./Mission")),
  values: dynamic(() => import("./Values")),
  timeline: dynamic(() => import("./Timeline")),
  team: dynamic(() => import("./Team")),
  stats: dynamic(() => import("./Stats")),
  testimonials: dynamic(() => import("./Testimonials")),
};

type BlockKey = keyof AboutData;

export default function RenderBlockAbout({
  blockKey,
  data,
  preferences,
}: {
  blockKey: BlockKey;
  data: AboutData;
  preferences: AboutPreferences;
}) {
  switch (blockKey) {
    case "hero": {
      const HeroBlock = components.hero;
      return <HeroBlock key={blockKey} {...data.hero} preferences={preferences} />;
    }
    case "mission": {
      const MissionBlock = components.mission;
      return (
        <PageSectionFrame>
          <MissionBlock key={blockKey} {...data.mission} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "values": {
      const ValuesBlock = components.values;
      return (
        <PageSectionFrame>
          <ValuesBlock key={blockKey} {...data.values} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "timeline": {
      const TimelineBlock = components.timeline;
      return (
        <PageSectionFrame>
          <TimelineBlock key={blockKey} {...data.timeline} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "team": {
      const TeamBlock = components.team;
      return (
        <PageSectionFrame>
          <TeamBlock key={blockKey} {...data.team} preferences={preferences} />
        </PageSectionFrame>
      );
    }
    case "stats": {
      const StatsBlock = components.stats;
      return (
        <PageSectionFrame>
          <StatsBlock key={blockKey} {...data.stats} preferences={preferences} />
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
    default:
      return null;
  }
}
