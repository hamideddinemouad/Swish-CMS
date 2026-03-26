export type ArticlesPage = {
  page: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

export const page = {
  page: "articles",
  components: [
    { type: "nav", enabled: true },
    { type: "hero", enabled: true },
    { type: "featuredArticles", enabled: true },
    { type: "editorialSeries", enabled: true },
    { type: "categories", enabled: true },
    { type: "trending", enabled: true },
    { type: "authors", enabled: true },
    { type: "newsletter", enabled: true },
    { type: "footer", enabled: true },
  ],
} satisfies ArticlesPage;
