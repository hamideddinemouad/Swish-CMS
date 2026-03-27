export type AboutPage = {
  page: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

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
