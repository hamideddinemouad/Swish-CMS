export type HomeColorPresetId = "slate" | "forest" | "sunset" | "sand";
export type HomeHeadingFontPresetId = "serif" | "modern-sans" | "editorial";
export type HomeBodyFontPresetId = "sans" | "humanist";
export type HomeDisplaySizePresetId = "lg" | "xl" | "display";
export type HomeBodySizePresetId = "sm" | "md" | "lg";

export type HomeDesignSectionKey =
  | "hero"
  | "featuredStories"
  | "offerings"
  | "testimonials"
  | "newsletter"
  | "footer";

export type HomeSectionDesignPreferences = {
  colorPreset?: HomeColorPresetId;
  headingFontPreset?: HomeHeadingFontPresetId;
  bodyFontPreset?: HomeBodyFontPresetId;
  displaySizePreset?: HomeDisplaySizePresetId;
  bodySizePreset?: HomeBodySizePresetId;
};

export type HomeDesignPreferences = Partial<
  Record<HomeDesignSectionKey, HomeSectionDesignPreferences>
>;

type LegacyFlatHomeDesignPreferences = HomeSectionDesignPreferences;

type LegacyHomeTokens = {
  hero?: {
    wrapper?: string;
    title?: string;
    subtitle?: string;
    ctaGroup?: string;
  };
};

type HomePreferenceSource = LegacyHomeTokens & {
  homeDesign?: HomeDesignPreferences | LegacyFlatHomeDesignPreferences;
};

type ColorPreset = {
  id: HomeColorPresetId;
  label: string;
  swatch: string;
  pageBackgroundClass: string;
  heroWrapperClass: string;
  heroTitleClass: string;
  heroSubtitleClass: string;
  primaryButtonClass: string;
  secondaryButtonClass: string;
  sectionShellClass: string;
  sectionEyebrowClass: string;
  sectionHeadingClass: string;
  bodyTextClass: string;
  mutedTextClass: string;
  cardBaseClass: string;
  cardCompactClass: string;
  linkAccentClass: string;
  newsletterShellClass: string;
  newsletterBodyClass: string;
  newsletterButtonClass: string;
  footerWrapperClass: string;
  footerTextClass: string;
  footerLinkClass: string;
  imageFrameClass: string;
  imageShadowClass: string;
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
};

export const HOME_DESIGN_SECTIONS: Array<{
  id: HomeDesignSectionKey;
  label: string;
}> = [
  { id: "hero", label: "Hero Design" },
  { id: "featuredStories", label: "Featured Stories Design" },
  { id: "offerings", label: "Offerings Design" },
  { id: "testimonials", label: "Testimonials Design" },
  { id: "newsletter", label: "Newsletter Design" },
  { id: "footer", label: "Footer Design" },
];

export const HOME_COLOR_PRESETS: ColorPreset[] = [
  {
    id: "slate",
    label: "Slate",
    swatch: "linear-gradient(135deg, #0f172a 0%, #f59e0b 100%)",
    pageBackgroundClass: "bg-slate-950",
    heroWrapperClass: "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-900",
    heroTitleClass: "text-white",
    heroSubtitleClass: "text-slate-300",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-amber-400",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-amber-500 px-6 py-3 text-sm font-semibold text-white hover:border-amber-400",
    sectionShellClass:
      "rounded-[2rem] border border-slate-800 bg-slate-900/70 p-8 shadow-2xl md:p-10",
    sectionEyebrowClass: "text-amber-300",
    sectionHeadingClass: "text-white",
    bodyTextClass: "text-slate-300",
    mutedTextClass: "text-slate-500",
    cardBaseClass: "rounded-3xl border border-slate-800 bg-slate-950/80 p-8 shadow-2xl",
    cardCompactClass:
      "rounded-2xl border border-slate-800 bg-slate-950/70 p-6 shadow-xl",
    linkAccentClass: "text-amber-300 hover:text-amber-200",
    newsletterShellClass:
      "rounded-3xl border border-amber-500 bg-gradient-to-r from-amber-500/20 to-slate-900/60 px-6 py-8 text-white shadow-2xl",
    newsletterBodyClass: "text-amber-100",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg hover:bg-slate-100",
    footerWrapperClass: "border-t border-slate-800 bg-slate-950 py-10",
    footerTextClass: "text-sm text-slate-400",
    footerLinkClass: "text-sm text-amber-300 hover:text-amber-200 transition",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_30px_80px_rgba(2,6,23,0.7)]",
  },
  {
    id: "forest",
    label: "Forest",
    swatch: "linear-gradient(135deg, #052e16 0%, #34d399 100%)",
    pageBackgroundClass: "bg-emerald-950",
    heroWrapperClass: "bg-gradient-to-b from-emerald-950 via-emerald-900 to-teal-900",
    heroTitleClass: "text-emerald-50",
    heroSubtitleClass: "text-emerald-200",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg hover:bg-emerald-300",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-emerald-300 px-6 py-3 text-sm font-semibold text-emerald-50 hover:border-emerald-200",
    sectionShellClass:
      "rounded-[2rem] border border-emerald-800 bg-emerald-900/55 p-8 shadow-2xl md:p-10",
    sectionEyebrowClass: "text-emerald-300",
    sectionHeadingClass: "text-emerald-50",
    bodyTextClass: "text-emerald-100/80",
    mutedTextClass: "text-emerald-300/60",
    cardBaseClass:
      "rounded-3xl border border-emerald-800 bg-emerald-950/60 p-8 shadow-2xl",
    cardCompactClass:
      "rounded-2xl border border-emerald-800 bg-emerald-950/45 p-6 shadow-xl",
    linkAccentClass: "text-emerald-300 hover:text-emerald-100",
    newsletterShellClass:
      "rounded-3xl border border-emerald-400 bg-gradient-to-r from-emerald-500/20 to-teal-900/60 px-6 py-8 text-emerald-50 shadow-2xl",
    newsletterBodyClass: "text-emerald-100/85",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-emerald-50 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-lg hover:bg-white",
    footerWrapperClass: "border-t border-emerald-800 bg-emerald-950 py-10",
    footerTextClass: "text-sm text-emerald-200/75",
    footerLinkClass: "text-sm text-emerald-300 hover:text-emerald-100 transition",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-emerald-900 to-teal-800 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_30px_80px_rgba(4,120,87,0.45)]",
  },
  {
    id: "sunset",
    label: "Sunset",
    swatch: "linear-gradient(135deg, #7c2d12 0%, #fb7185 100%)",
    pageBackgroundClass: "bg-rose-950",
    heroWrapperClass: "bg-gradient-to-b from-orange-950 via-rose-900 to-fuchsia-950",
    heroTitleClass: "text-rose-50",
    heroSubtitleClass: "text-orange-100",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-rose-300 px-6 py-3 text-sm font-semibold text-rose-950 shadow-lg hover:bg-rose-200",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-rose-200 px-6 py-3 text-sm font-semibold text-rose-50 hover:border-orange-100",
    sectionShellClass:
      "rounded-[2rem] border border-rose-800 bg-rose-900/45 p-8 shadow-2xl md:p-10",
    sectionEyebrowClass: "text-rose-200",
    sectionHeadingClass: "text-rose-50",
    bodyTextClass: "text-rose-100/85",
    mutedTextClass: "text-rose-200/60",
    cardBaseClass: "rounded-3xl border border-rose-800 bg-rose-950/45 p-8 shadow-2xl",
    cardCompactClass:
      "rounded-2xl border border-rose-800 bg-rose-950/30 p-6 shadow-xl",
    linkAccentClass: "text-rose-200 hover:text-orange-100",
    newsletterShellClass:
      "rounded-3xl border border-rose-300 bg-gradient-to-r from-rose-400/20 to-orange-900/60 px-6 py-8 text-rose-50 shadow-2xl",
    newsletterBodyClass: "text-orange-100/90",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-rose-50 px-6 py-3 text-sm font-semibold text-rose-900 shadow-lg hover:bg-white",
    footerWrapperClass: "border-t border-rose-800 bg-rose-950 py-10",
    footerTextClass: "text-sm text-rose-100/75",
    footerLinkClass: "text-sm text-orange-200 hover:text-rose-50 transition",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-orange-700 to-rose-600 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_30px_80px_rgba(225,29,72,0.38)]",
  },
  {
    id: "sand",
    label: "Sand",
    swatch: "linear-gradient(135deg, #f5e7d2 0%, #caa472 100%)",
    pageBackgroundClass: "bg-stone-100",
    heroWrapperClass: "bg-gradient-to-b from-stone-100 via-amber-50 to-orange-100",
    heroTitleClass: "text-stone-900",
    heroSubtitleClass: "text-stone-600",
    primaryButtonClass:
      "inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 shadow-lg hover:bg-stone-800",
    secondaryButtonClass:
      "inline-flex items-center justify-center rounded-full border border-stone-400 px-6 py-3 text-sm font-semibold text-stone-800 hover:border-stone-600",
    sectionShellClass:
      "rounded-[2rem] border border-stone-300 bg-gradient-to-br from-stone-50 to-amber-50 p-8 shadow-xl md:p-10",
    sectionEyebrowClass: "text-amber-700",
    sectionHeadingClass: "text-stone-900",
    bodyTextClass: "text-stone-700",
    mutedTextClass: "text-stone-500",
    cardBaseClass: "rounded-3xl border border-stone-300 bg-white/90 p-8 shadow-xl",
    cardCompactClass: "rounded-2xl border border-stone-300 bg-white/80 p-6 shadow-lg",
    linkAccentClass: "text-amber-700 hover:text-stone-900",
    newsletterShellClass:
      "rounded-3xl border border-amber-500 bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-8 text-stone-900 shadow-xl",
    newsletterBodyClass: "text-stone-700",
    newsletterButtonClass:
      "inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-sm font-semibold text-stone-50 shadow-lg hover:bg-stone-800",
    footerWrapperClass: "border-t border-stone-300 bg-stone-100 py-10",
    footerTextClass: "text-sm text-stone-600",
    footerLinkClass: "text-sm text-stone-800 hover:text-stone-950 transition",
    imageFrameClass:
      "rounded-[2rem] bg-gradient-to-br from-stone-300 to-amber-200 p-1 shadow-2xl",
    imageShadowClass: "shadow-[0_30px_80px_rgba(120,113,108,0.28)]",
  },
];

export const HOME_HEADING_FONT_PRESETS: FontPreset<HomeHeadingFontPresetId>[] = [
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

export const HOME_BODY_FONT_PRESETS: FontPreset<HomeBodyFontPresetId>[] = [
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

export const HOME_DISPLAY_SIZE_PRESETS: SizePreset<HomeDisplaySizePresetId>[] = [
  {
    id: "lg",
    label: "Large",
    heroTitleClass: "text-3xl md:text-5xl",
    sectionTitleClass: "text-2xl md:text-3xl",
    bodyClass: "text-base",
  },
  {
    id: "xl",
    label: "Extra Large",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-lg",
  },
  {
    id: "display",
    label: "Display",
    heroTitleClass: "text-5xl md:text-7xl",
    sectionTitleClass: "text-3xl md:text-4xl",
    bodyClass: "text-lg",
  },
];

export const HOME_BODY_SIZE_PRESETS: SizePreset<HomeBodySizePresetId>[] = [
  {
    id: "sm",
    label: "Small",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-sm",
  },
  {
    id: "md",
    label: "Medium",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-base",
  },
  {
    id: "lg",
    label: "Large",
    heroTitleClass: "text-4xl md:text-6xl",
    sectionTitleClass: "text-3xl",
    bodyClass: "text-lg",
  },
];

const DEFAULT_DESIGN: Required<HomeSectionDesignPreferences> = {
  colorPreset: "slate",
  headingFontPreset: "serif",
  bodyFontPreset: "sans",
  displaySizePreset: "xl",
  bodySizePreset: "md",
};

function resolveFromPresetList<T extends { id: string }>(
  presets: T[],
  id: string | undefined,
  fallbackId: string,
): T {
  return (
    presets.find((preset) => preset.id === id) ??
    presets.find((preset) => preset.id === fallbackId) ??
    presets[0]
  );
}

function isPerSectionDesign(
  homeDesign: HomePreferenceSource["homeDesign"],
): homeDesign is HomeDesignPreferences {
  if (!homeDesign || typeof homeDesign !== "object" || Array.isArray(homeDesign)) {
    return false;
  }

  return HOME_DESIGN_SECTIONS.some(({ id }) => {
    const candidate = (homeDesign as Record<string, unknown>)[id];
    return candidate != null && typeof candidate === "object" && !Array.isArray(candidate);
  });
}

function getSectionPreferenceSource(
  homeDesign: HomePreferenceSource["homeDesign"],
  section: HomeDesignSectionKey,
) {
  if (isPerSectionDesign(homeDesign)) {
    return homeDesign[section] ?? {};
  }

  return homeDesign ?? {};
}

export function getDefaultHomeSectionDesign(): Required<HomeSectionDesignPreferences> {
  return DEFAULT_DESIGN;
}

export function getSelectedHomeSectionDesign(
  preferences: HomePreferenceSource | undefined,
  section: HomeDesignSectionKey,
) {
  return resolveHomeSectionDesign(preferences, section).selected;
}

export function resolveHomeSectionDesign(
  preferences: HomePreferenceSource | undefined,
  section: HomeDesignSectionKey,
) {
  const homeDesign = preferences?.homeDesign;
  const sectionDesign = getSectionPreferenceSource(homeDesign, section);
  const legacyHero = preferences?.hero ?? {};
  const color = resolveFromPresetList(
    HOME_COLOR_PRESETS,
    sectionDesign.colorPreset,
    DEFAULT_DESIGN.colorPreset,
  );
  const headingFont = resolveFromPresetList(
    HOME_HEADING_FONT_PRESETS,
    sectionDesign.headingFontPreset,
    DEFAULT_DESIGN.headingFontPreset,
  );
  const bodyFont = resolveFromPresetList(
    HOME_BODY_FONT_PRESETS,
    sectionDesign.bodyFontPreset,
    DEFAULT_DESIGN.bodyFontPreset,
  );
  const displaySize = resolveFromPresetList(
    HOME_DISPLAY_SIZE_PRESETS,
    sectionDesign.displaySizePreset,
    DEFAULT_DESIGN.displaySizePreset,
  );
  const bodySize = resolveFromPresetList(
    HOME_BODY_SIZE_PRESETS,
    sectionDesign.bodySizePreset,
    DEFAULT_DESIGN.bodySizePreset,
  );

  return {
    selected: {
      colorPreset: color.id,
      headingFontPreset: headingFont.id,
      bodyFontPreset: bodyFont.id,
      displaySizePreset: displaySize.id,
      bodySizePreset: bodySize.id,
    } satisfies Required<HomeSectionDesignPreferences>,
    color,
    headingFont,
    bodyFont,
    displaySize,
    bodySize,
    legacyHero: {
      wrapper: legacyHero.wrapper ?? "py-24 md:py-32",
      title: legacyHero.title ?? "font-semibold leading-tight",
      subtitle: legacyHero.subtitle ?? "mt-4 max-w-3xl",
      ctaGroup: legacyHero.ctaGroup ?? "mt-8 flex flex-wrap gap-4",
    },
  };
}
