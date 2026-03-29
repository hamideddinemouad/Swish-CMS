export type PageSummary = {
  slug?: string;
  pageName?: string;
  name?: string;
  title?: string;
  components?: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
};

export type PageDetail = {
  slug: string;
  components: Array<{
    type: string;
    enabled: boolean;
    variant?: string;
  }>;
  data: Record<string, unknown>;
  preference: Record<string, unknown>;
};

export type EditorPagesResponse = Array<PageSummary> | { pages: Array<PageSummary> };
