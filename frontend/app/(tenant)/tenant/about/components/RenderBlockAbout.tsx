"use client";

import dynamic from "next/dynamic";
import type { AboutData } from "@/visualizer/demo/about/data";
import type { AboutPreferences } from "@/visualizer/demo/about/preference";

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
