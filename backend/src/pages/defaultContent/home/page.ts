export type HomePage = {
  page: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

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
