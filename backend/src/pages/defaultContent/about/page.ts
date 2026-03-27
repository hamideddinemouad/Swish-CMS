import type { DefaultPageDefinition } from '../types';

export type AboutPage = DefaultPageDefinition;

export const page = {
  page: "about",
  components: [
    { type: "nav", enabled: true },
    { type: "hero", enabled: true },
    { type: "mission", enabled: true },
    { type: "values", enabled: true },
    { type: "timeline", enabled: true },
    { type: "team", enabled: true },
    { type: "stats", enabled: true },
    { type: "testimonials", enabled: true },
    { type: "footer", enabled: true },
  ],
} satisfies AboutPage;
