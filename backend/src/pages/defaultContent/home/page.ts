import type { DefaultPageDefinition } from '../types';

export type HomePage = DefaultPageDefinition;

export const page = {
  page: "home",
  components: [
    { type: "nav", enabled: true },
    { type: "hero", enabled: true },
    { type: "featuredStories", enabled: true },
    { type: "offerings", enabled: true },
    { type: "testimonials", enabled: true },
    { type: "newsletter", enabled: true },
    { type: "footer", enabled: true },
  ],
} satisfies HomePage;
