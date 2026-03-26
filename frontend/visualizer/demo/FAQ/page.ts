export type FAQPage = {
  page: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

export const page = {
  page: "faq",
  components: [
    { type: "nav", enabled: true },
    { type: "hero", enabled: true },
    { type: "faq", enabled: true },
    { type: "supportLinks", enabled: true },
    { type: "footer", enabled: true },
  ],
} satisfies FAQPage;
