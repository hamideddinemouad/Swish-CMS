export type EditorMode = "content" | "design" | "structure";

export type PageComponent = {
  type: string;
  enabled: boolean;
  variant?: string;
};

export type PageConfig = {
  slug: string;
  components: PageComponent[];
  data: Record<string, unknown>;
  preference: Record<string, unknown>;
};

export type AvailablePage = {
  slug: string;
  title: string;
};

export type EditorIdentity = {
  sub: string;
  email: string;
  tenantId: string | null;
  tenantSubdomain: string | null;
  type: "access";
};
