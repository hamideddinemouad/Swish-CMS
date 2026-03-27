export type CategoriesPage = {
  page: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

export const page = {
  page: "categories",
  components: [
    { type: "nav", enabled: true },
    { type: "hero", enabled: true },
    { type: "categoryGrid", enabled: true },
    { type: "featuredCollections", enabled: true },
    { type: "resourceLinks", enabled: true },
    { type: "newsletter", enabled: true },
    { type: "footer", enabled: true },
  ],
} satisfies CategoriesPage;
