export type ContactPage = {
  page: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

export const page = {
  page: "contact",
  components: [
    { type: "nav", enabled: true },
    { type: "hero", enabled: true },
    { type: "contactInfo", enabled: true },
    { type: "locations", enabled: true },
    { type: "form", enabled: true },
    { type: "faq", enabled: true },
    { type: "footer", enabled: true },
  ],
} satisfies ContactPage;
