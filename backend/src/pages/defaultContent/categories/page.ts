import type { DefaultPageDefinition } from '../types';

export type CategoriesPage = DefaultPageDefinition;

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
