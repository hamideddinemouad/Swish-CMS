export type DefaultPageComponent = {
  type: string;
  enabled: boolean;
  variant?: string;
};

export type DefaultPageDefinition = {
  page: string;
  components: DefaultPageComponent[];
};

export type DefaultPageData = Record<string, unknown>;

export type DefaultPagePreferences = {
  theme: {
    colorScheme: {
      primary: string;
      secondary: string;
      accent: string;
    };
    background: string;
    surface: string;
    text: {
      primary: string;
      secondary: string;
    };
  };
  typography: {
    headingFont: string;
    bodyFont: string;
    headingWeight: string;
    bodyWeight: string;
    headingSizes: {
      h1: string;
      h2: string;
      h3: string;
    };
    bodySize: string;
    smallSize: string;
  };
  layout: {
    container: string;
    sectionSpacing: string;
    gap: string;
  };
  borders: {
    radius: {
      sm: string;
      md: string;
      lg: string;
      full: string;
    };
    style: string;
  };
  shadow: {
    card: string;
    modal: string;
    none: string;
  };
  buttons: {
    primary: string;
    secondary: string;
    outline: string;
  };
  cards: {
    base: string;
    compact: string;
  };
  navigation: {
    wrapper: string;
    inner: string;
    link: string;
    linkActive: string;
  };
  hero: {
    wrapper: string;
    title: string;
    subtitle: string;
    ctaGroup: string;
  };
  pageDesign?: {
    colorPreset?: string;
    headingFontPreset?: string;
    bodyFontPreset?: string;
    displaySizePreset?: string;
    bodySizePreset?: string;
  };
  componentDesign?: Record<
    string,
    {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    }
  >;
  homeDesign?: {
    hero?: {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    };
    featuredStories?: {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    };
    offerings?: {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    };
    testimonials?: {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    };
    newsletter?: {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    };
    footer?: {
      colorPreset?: string;
      headingFontPreset?: string;
      bodyFontPreset?: string;
      displaySizePreset?: string;
      bodySizePreset?: string;
    };
  };
  footer: {
    wrapper: string;
    text: string;
    link: string;
  };
};

export type DefaultPageSeed = {
  slug: string;
  title: string;
  page: DefaultPageDefinition;
  data: DefaultPageData;
  preference: DefaultPagePreferences;
};

export const DEFAULT_PAGE_KEYS = [
  'home',
  'about',
  'articles',
  'categories',
  'contact',
  'faq',
] as const;

export type DefaultPageKey = (typeof DEFAULT_PAGE_KEYS)[number];

export type DefaultPageTemplate = {
  id: string;
  label: string;
  seeds: readonly DefaultPageSeed[];
};
