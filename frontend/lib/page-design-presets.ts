export type PageColorPresetId = "slate" | "meadow" | "sunset" | "sand";
export type PageHeadingFontPresetId = "serif" | "modern-sans" | "editorial";
export type PageBodyFontPresetId = "sans" | "humanist";
export type PageDisplaySizePresetId = "lg" | "xl" | "display";
export type PageBodySizePresetId = "sm" | "md" | "lg";

export type PageDesignPreferences = {
  colorPreset?: PageColorPresetId;
  headingFontPreset?: PageHeadingFontPresetId;
  bodyFontPreset?: PageBodyFontPresetId;
  displaySizePreset?: PageDisplaySizePresetId;
  bodySizePreset?: PageBodySizePresetId;
};

export type PageComponentDesignPreferences = Record<string, PageDesignPreferences>;

type BasePagePreferences = {
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
  footer: {
    wrapper: string;
    text: string;
    link: string;
  };
  pageDesign?: PageDesignPreferences;
  componentDesign?: PageComponentDesignPreferences;
};

type ColorPreset = {
  id: PageColorPresetId;
  label: string;
  swatch: string;
  pageBackgroundClass: string;
  heroWrapperClass: string;
  heroTitleClass: string;
  heroSubtitleClass: string;
  accentClass: string;
  headingClass: string;
  bodyClass: string;
  mutedClass: string;
  primaryButtonClass: string;
  secondaryButtonClass: string;
  outlineButtonClass: string;
  cardBaseClass: string;
  cardCompactClass: string;
  panelClass: string;
  linkAccentClass: string;
  imageFrameClass: string;
  imageShadowClass: string;
  newsletterShellClass: string;
  newsletterButtonClass: string;
};

type FontPreset<T extends string> = {
  id: T;
  label: string;
  fontFamily: string;
};

type SizePreset<T extends string> = {
  id: T;
  label: string;
  heroTitleClass: string;
  sectionTitleClass: string;
  bodyClass: string;
  smallClass: string;
};

export const PAGE_COLOR_PRESETS: ColorPreset[] = [
  {
    id: "slate",
    label: "Slate",
    swatch: "linear-gradient(135deg, #0f172a 0%, #34d399 100%)",
    pageBackgroundClass: "bg-slate-950",
    heroWrapperClass: "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900",
    heroTitleClass: "text-white",
    heroSubtitleClass: "text-slate-300",
    accentClass: "text-emerald-300",
    headingClass: "text-white",
    bodyClass: "text-slate-300",
    mutedClass: "text-slate-500",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-300",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-emerald-300 px-6 py-3 text-sm font-semibold text-white hover:border-emerald-200",
    outlineButtonClass:
      "inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-white hover:border-emerald-300 transition",
    cardBaseClass: "rounded-3xl border border-slate-800 bg-slate-900/70 p-8 shadow-2xl",
    cardCompactClass:
      "rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl",
    panelClass: "rounded-3xl border border-slate-800 bg-slate-900/55 p-8 shadow-xl",
    linkAccentClass: "text-emerald-300 hover:text-emerald-200",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_30px_80px_rgba(2,6,23,0.65)]",
    newsletterShellClass:
      "rounded-3xl border border-emerald-400 bg-gradient-to-r from-slate-900 to-slate-950 px-6 py-8 shadow-2xl",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg hover:bg-emerald-300",
  },
  {
    id: "meadow",
    label: "Meadow",
    swatch: "linear-gradient(135deg, #ecfdf5 0%, #10b981 100%)",
    pageBackgroundClass: "bg-gradient-to-b from-white to-emerald-50",
    heroWrapperClass: "bg-gradient-to-b from-white via-emerald-50 to-white",
    heroTitleClass: "text-emerald-950",
    heroSubtitleClass: "text-emerald-700",
    accentClass: "text-emerald-500",
    headingClass: "text-slate-900",
    bodyClass: "text-slate-600",
    mutedClass: "text-slate-500",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50",
    outlineButtonClass:
      "inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-2 text-emerald-700 hover:border-emerald-400 transition",
    cardBaseClass: "rounded-3xl border border-emerald-100 bg-white/90 p-8 shadow-xl",
    cardCompactClass:
      "rounded-2xl border border-emerald-100 bg-white/85 p-6 shadow-lg",
    panelClass: "rounded-3xl border border-emerald-100 bg-white/85 p-8 shadow-xl",
    linkAccentClass: "text-emerald-600 hover:text-emerald-500",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-emerald-100 to-white p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_24px_70px_rgba(16,185,129,0.25)]",
    newsletterShellClass:
      "rounded-3xl border border-emerald-200 bg-gradient-to-r from-white to-emerald-50 px-6 py-8 shadow-xl",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-emerald-500",
  },
  {
    id: "sunset",
    label: "Sunset",
    swatch: "linear-gradient(135deg, #7c2d12 0%, #fb7185 100%)",
    pageBackgroundClass: "bg-gradient-to-br from-orange-50 via-white to-rose-50",
    heroWrapperClass: "bg-gradient-to-b from-orange-50 to-white",
    heroTitleClass: "text-stone-900",
    heroSubtitleClass: "text-stone-600",
    accentClass: "text-rose-500",
    headingClass: "text-stone-900",
    bodyClass: "text-stone-600",
    mutedClass: "text-stone-500",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-400",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-stone-800 hover:bg-orange-50",
    outlineButtonClass:
      "inline-flex items-center justify-center rounded-full border border-rose-200 px-5 py-2 text-rose-600 hover:border-orange-300 transition",
    cardBaseClass: "rounded-3xl border border-orange-100 bg-white/90 p-8 shadow-xl",
    cardCompactClass:
      "rounded-2xl border border-orange-100 bg-white/85 p-6 shadow-lg",
    panelClass: "rounded-3xl border border-orange-100 bg-white/85 p-8 shadow-xl",
    linkAccentClass: "text-rose-500 hover:text-orange-500",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-orange-100 to-rose-100 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_24px_70px_rgba(244,114,182,0.25)]",
    newsletterShellClass:
      "rounded-3xl border border-orange-200 bg-gradient-to-r from-orange-100 to-white px-6 py-8 shadow-xl",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-rose-400",
  },
  {
    id: "sand",
    label: "Sand",
    swatch: "linear-gradient(135deg, #f5e7d2 0%, #caa472 100%)",
    pageBackgroundClass: "bg-gradient-to-br from-amber-50 via-white to-stone-100",
    heroWrapperClass: "bg-gradient-to-b from-amber-50 to-white",
    heroTitleClass: "text-amber-950",
    heroSubtitleClass: "text-amber-700",
    accentClass: "text-amber-600",
    headingClass: "text-amber-950",
    bodyClass: "text-amber-700",
    mutedClass: "text-amber-500",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-amber-500",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-amber-200 bg-white px-6 py-3 text-sm font-semibold text-amber-800 hover:bg-amber-50",
    outlineButtonClass:
      "inline-flex items-center justify-center rounded-full border border-amber-200 px-5 py-2 text-amber-700 hover:border-rose-200 transition",
    cardBaseClass: "rounded-3xl border border-amber-100 bg-white/85 p-8 shadow-xl",
    cardCompactClass:
      "rounded-2xl border border-amber-100 bg-white/80 p-6 shadow-lg",
    panelClass: "rounded-3xl border border-amber-100 bg-white/85 p-8 shadow-xl",
    linkAccentClass: "text-amber-700 hover:text-rose-500",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-amber-100 to-rose-100 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_24px_70px_rgba(202,138,4,0.22)]",
    newsletterShellClass:
      "rounded-3xl border border-amber-200 bg-gradient-to-r from-amber-50 to-white px-6 py-8 shadow-xl",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-amber-500",
  },
];

export const PAGE_HEADING_FONT_PRESETS: FontPreset<PageHeadingFontPresetId>[] = [
  {
    id: "serif",
    label: "Serif",
    fontFamily:
      '"Iowan Old Style", "Palatino Linotype", "Book Antiqua", Georgia, serif',
  },
  {
    id: "modern-sans",
    label: "Modern Sans",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  {
    id: "editorial",
    label: "Editorial",
    fontFamily: '"Baskerville", "Times New Roman", Georgia, serif',
  },
];

export const PAGE_BODY_FONT_PRESETS: FontPreset<PageBodyFontPresetId>[] = [
  {
    id: "sans",
    label: "Sans",
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
  },
  {
    id: "humanist",
    label: "Humanist",
    fontFamily: '"Trebuchet MS", "Gill Sans", "Segoe UI", sans-serif',
  },
];

export const PAGE_DISPLAY_SIZE_PRESETS: SizePreset<PageDisplaySizePresetId>[] = [
  {
    id: "lg",
    label: "Large",
    heroTitleClass: "text-3xl md:text-5xl",
    sectionTitleClass: "text-2xl md:text-3xl",
    bodyClass: "text-base",
    smallClass: "text-sm",
  },
  {
    id: "xl",
    label: "Extra Large",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl md:text-4xl",
    bodyClass: "text-lg",
    smallClass: "text-sm",
  },
  {
    id: "display",
    label: "Display",
    heroTitleClass: "text-5xl md:text-7xl",
    sectionTitleClass: "text-3xl md:text-5xl",
    bodyClass: "text-lg",
    smallClass: "text-sm",
  },
];

export const PAGE_BODY_SIZE_PRESETS: SizePreset<PageBodySizePresetId>[] = [
  {
    id: "sm",
    label: "Small",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-sm",
    smallClass: "text-xs",
  },
  {
    id: "md",
    label: "Medium",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-base",
    smallClass: "text-sm",
  },
  {
    id: "lg",
    label: "Large",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-lg",
    smallClass: "text-base",
  },
];

function resolveFromPresetList<T extends { id: string }>(
  presets: T[],
  id: string | undefined,
  fallbackId: string,
) {
  return (
    presets.find((preset) => preset.id === id) ??
    presets.find((preset) => preset.id === fallbackId) ??
    presets[0]
  );
}

function inferColorPreset(preferences: BasePagePreferences): PageColorPresetId {
  const source = [
    preferences.theme.background,
    preferences.buttons.primary,
    preferences.hero.wrapper,
  ].join(" ");

  if (source.includes("slate")) {
    return "slate";
  }

  if (source.includes("emerald")) {
    return "meadow";
  }

  if (source.includes("rose")) {
    return "sunset";
  }

  return "sand";
}

function inferHeadingFontPreset(
  preferences: BasePagePreferences,
): PageHeadingFontPresetId {
  return preferences.typography.headingFont.includes("serif") ? "serif" : "modern-sans";
}

function inferBodyFontPreset(preferences: BasePagePreferences): PageBodyFontPresetId {
  return preferences.typography.bodyFont.includes("sans") ? "sans" : "humanist";
}

function inferDisplaySizePreset(
  preferences: BasePagePreferences,
): PageDisplaySizePresetId {
  if (preferences.hero.title.includes("text-5xl") || preferences.hero.title.includes("text-7xl")) {
    return "display";
  }

  if (preferences.hero.title.includes("text-4xl") || preferences.hero.title.includes("text-6xl")) {
    return "xl";
  }

  return "lg";
}

function inferBodySizePreset(preferences: BasePagePreferences): PageBodySizePresetId {
  if (preferences.typography.bodySize.includes("text-lg")) {
    return "lg";
  }

  if (preferences.typography.bodySize.includes("text-sm")) {
    return "sm";
  }

  return "md";
}

function getComponentDesignSource(
  preferences: BasePagePreferences,
  componentKey: string,
) {
  return preferences.componentDesign?.[componentKey] ?? preferences.pageDesign ?? {};
}

export function resolvePageComponentDesign(
  preferences: BasePagePreferences,
  componentKey: string,
) {
  const componentDesign = getComponentDesignSource(preferences, componentKey);
  const color = resolveFromPresetList(
    PAGE_COLOR_PRESETS,
    componentDesign.colorPreset,
    inferColorPreset(preferences),
  );
  const headingFont = resolveFromPresetList(
    PAGE_HEADING_FONT_PRESETS,
    componentDesign.headingFontPreset,
    inferHeadingFontPreset(preferences),
  );
  const bodyFont = resolveFromPresetList(
    PAGE_BODY_FONT_PRESETS,
    componentDesign.bodyFontPreset,
    inferBodyFontPreset(preferences),
  );
  const displaySize = resolveFromPresetList(
    PAGE_DISPLAY_SIZE_PRESETS,
    componentDesign.displaySizePreset,
    inferDisplaySizePreset(preferences),
  );
  const bodySize = resolveFromPresetList(
    PAGE_BODY_SIZE_PRESETS,
    componentDesign.bodySizePreset,
    inferBodySizePreset(preferences),
  );

  return {
    selected: {
      colorPreset: color.id,
      headingFontPreset: headingFont.id,
      bodyFontPreset: bodyFont.id,
      displaySizePreset: displaySize.id,
      bodySizePreset: bodySize.id,
    } satisfies Required<PageDesignPreferences>,
    color,
    headingFont,
    bodyFont,
    displaySize,
    bodySize,
  };
}

export function getSelectedPageComponentDesign(
  preferences: BasePagePreferences,
  componentKey: string,
) {
  return resolvePageComponentDesign(preferences, componentKey).selected;
}

export function getDefaultPageDesign(preferences: BasePagePreferences) {
  return resolvePageComponentDesign(preferences, "hero").selected;
}

export function resolvePageComponentPreferences<T extends BasePagePreferences>(
  preferences: T,
  componentKey: string,
): T {
  const design = resolvePageComponentDesign(preferences, componentKey);

  return {
    ...preferences,
    theme: {
      ...preferences.theme,
      background: design.color.pageBackgroundClass,
      colorScheme: {
        ...preferences.theme.colorScheme,
        primary: design.color.primaryButtonClass,
        secondary: design.color.secondaryButtonClass,
        accent: design.color.accentClass,
      },
      text: {
        primary: design.color.headingClass,
        secondary: design.color.bodyClass,
      },
    },
    typography: {
      ...preferences.typography,
      headingSizes: {
        ...preferences.typography.headingSizes,
        h1: design.displaySize.heroTitleClass,
        h2: design.displaySize.sectionTitleClass,
      },
      bodySize: design.bodySize.bodyClass,
      smallSize: design.bodySize.smallClass,
      headingFont: design.headingFont.fontFamily,
      bodyFont: design.bodyFont.fontFamily,
    },
    buttons: {
      ...preferences.buttons,
      primary: design.color.primaryButtonClass,
      secondary: design.color.secondaryButtonClass,
      outline: design.color.outlineButtonClass,
    },
    cards: {
      ...preferences.cards,
      base: design.color.cardBaseClass,
      compact: design.color.cardCompactClass,
    },
    hero: {
      ...preferences.hero,
      wrapper: `${stripBackgroundTokens(preferences.hero.wrapper)} ${design.color.heroWrapperClass}`.trim(),
      title: `${design.displaySize.heroTitleClass} font-semibold tracking-tight ${design.color.heroTitleClass}`.trim(),
      subtitle: `mt-4 ${design.bodySize.bodyClass} max-w-3xl ${design.color.heroSubtitleClass}`.trim(),
    },
  };
}

export function resolvePageCanvasClass(
  preferences: BasePagePreferences,
  componentKey = "hero",
) {
  return resolvePageComponentDesign(preferences, componentKey).color.pageBackgroundClass;
}

function stripBackgroundTokens(value: string) {
  return value
    .split(/\s+/)
    .filter(
      (token) =>
        token &&
        !token.startsWith("bg-") &&
        !token.startsWith("from-") &&
        !token.startsWith("via-") &&
        !token.startsWith("to-"),
    )
    .join(" ");
}
