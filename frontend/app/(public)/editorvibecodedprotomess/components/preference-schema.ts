export type PreferenceOption = { label: string; value: string };

export type PreferenceSpec = {
  label: string;
  help?: string;
  options?: PreferenceOption[];
  preview?: "chip" | "font" | "card";
};

const FONT_OPTIONS = [{ label: "Sans", value: "font-sans" }, { label: "Serif", value: "font-serif" }, { label: "Mono", value: "font-mono" }];
const WEIGHT_OPTIONS = [{ label: "Normal", value: "font-normal" }, { label: "Medium", value: "font-medium" }, { label: "Semibold", value: "font-semibold" }, { label: "Bold", value: "font-bold" }];
const RADIUS_OPTIONS = [{ label: "Small", value: "rounded-md" }, { label: "Medium", value: "rounded-xl" }, { label: "Large", value: "rounded-2xl" }, { label: "Full", value: "rounded-full" }];

export function getPreferenceSpec(path: string): PreferenceSpec {
  const specs: Record<string, PreferenceSpec> = {
    "theme.colorScheme.primary": {
      label: "Primary action style",
      options: [
        { label: "Slate", value: "bg-slate-900 text-white hover:bg-slate-800" },
        { label: "Amber", value: "bg-amber-600 text-white hover:bg-amber-700" },
        { label: "Rose", value: "bg-rose-500 text-white hover:bg-rose-600" },
      ],
      preview: "chip",
    },
    "theme.colorScheme.secondary": {
      label: "Secondary action style",
      options: [
        { label: "Light", value: "bg-white text-slate-900 hover:bg-slate-50" },
        { label: "Warm", value: "bg-white text-amber-900 hover:bg-amber-50" },
        { label: "Soft Rose", value: "bg-white text-rose-700 hover:bg-rose-50" },
      ],
      preview: "chip",
    },
    "theme.colorScheme.accent": {
      label: "Accent color",
      options: [
        { label: "Amber", value: "text-amber-500" },
        { label: "Sky", value: "text-sky-500" },
        { label: "Rose", value: "text-rose-500" },
        { label: "Emerald", value: "text-emerald-500" },
      ],
      preview: "chip",
    },
    "theme.background": {
      label: "Page background",
      options: [
        { label: "Dark slate", value: "bg-slate-950" },
        { label: "Warm light", value: "bg-gradient-to-br from-amber-50 via-white to-rose-50" },
        { label: "Plain white", value: "bg-white" },
      ],
      preview: "card",
    },
    "theme.surface": {
      label: "Surface",
      options: [
        { label: "Dark glass", value: "bg-slate-900/70 backdrop-blur-sm" },
        { label: "Soft glass", value: "bg-white/80 backdrop-blur" },
        { label: "Solid white", value: "bg-white" },
      ],
      preview: "card",
    },
    "theme.text.primary": { label: "Primary text", options: [{ label: "White", value: "text-white" }, { label: "Slate 900", value: "text-slate-900" }, { label: "Amber 900", value: "text-amber-900" }], preview: "chip" },
    "theme.text.secondary": { label: "Secondary text", options: [{ label: "Slate 300", value: "text-slate-300" }, { label: "Slate 600", value: "text-slate-600" }, { label: "Amber 600", value: "text-amber-600" }], preview: "chip" },
    "typography.headingFont": { label: "Heading font", options: FONT_OPTIONS, preview: "font" },
    "typography.bodyFont": { label: "Body font", options: FONT_OPTIONS, preview: "font" },
    "typography.headingWeight": { label: "Heading weight", options: WEIGHT_OPTIONS, preview: "chip" },
    "typography.bodyWeight": { label: "Body weight", options: WEIGHT_OPTIONS, preview: "chip" },
    "typography.headingSizes.h1": { label: "H1 size", options: [{ label: "XL", value: "text-4xl md:text-6xl" }, { label: "L", value: "text-3xl md:text-5xl" }, { label: "M", value: "text-2xl md:text-4xl" }], preview: "font" },
    "typography.headingSizes.h2": { label: "H2 size", options: [{ label: "XL", value: "text-3xl md:text-4xl" }, { label: "L", value: "text-2xl md:text-3xl" }, { label: "M", value: "text-xl md:text-2xl" }], preview: "font" },
    "typography.headingSizes.h3": { label: "H3 size", options: [{ label: "XL", value: "text-2xl md:text-3xl" }, { label: "L", value: "text-xl md:text-2xl" }, { label: "M", value: "text-lg md:text-xl" }], preview: "font" },
    "typography.bodySize": { label: "Body size", options: [{ label: "Base", value: "text-base" }, { label: "Large", value: "text-lg" }, { label: "Small", value: "text-sm" }], preview: "font" },
    "typography.smallSize": { label: "Small size", options: [{ label: "Sm", value: "text-sm" }, { label: "Xs", value: "text-xs" }, { label: "Base", value: "text-base" }], preview: "font" },
    "layout.container": { label: "Container width", options: [{ label: "Wide", value: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8" }, { label: "Narrow", value: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" }, { label: "Extra wide", value: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" }], preview: "card" },
    "layout.sectionSpacing": { label: "Section spacing", options: [{ label: "Relaxed", value: "py-16 md:py-24" }, { label: "Compact", value: "py-12 md:py-20" }, { label: "Spacious", value: "py-20 md:py-28" }], preview: "card" },
    "layout.gap": { label: "Block gap", options: [{ label: "Small", value: "gap-4" }, { label: "Medium", value: "gap-6" }, { label: "Large", value: "gap-8" }], preview: "card" },
    "borders.radius.sm": { label: "Small radius", options: RADIUS_OPTIONS, preview: "card" },
    "borders.radius.md": { label: "Medium radius", options: RADIUS_OPTIONS, preview: "card" },
    "borders.radius.lg": { label: "Large radius", options: RADIUS_OPTIONS, preview: "card" },
    "borders.radius.full": { label: "Full radius", options: RADIUS_OPTIONS, preview: "card" },
    "borders.style": { label: "Border style", options: [{ label: "Dark", value: "border border-slate-800" }, { label: "Warm", value: "border border-amber-100" }, { label: "Light", value: "border border-slate-200" }], preview: "card" },
    "shadow.card": { label: "Card shadow", options: [{ label: "None", value: "shadow-none" }, { label: "Medium", value: "shadow-md" }, { label: "Large", value: "shadow-xl" }, { label: "XL", value: "shadow-2xl" }], preview: "card" },
    "shadow.modal": { label: "Modal shadow", options: [{ label: "None", value: "shadow-none" }, { label: "Large", value: "shadow-xl" }, { label: "XL", value: "shadow-2xl" }], preview: "card" },
    "shadow.none": { label: "No shadow", options: [{ label: "None", value: "shadow-none" }, { label: "Soft", value: "shadow-sm" }, { label: "Medium", value: "shadow-md" }], preview: "card" },
    "buttons.primary": { label: "Primary button", options: [{ label: "Slate", value: "inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-white font-semibold hover:bg-slate-800 transition" }, { label: "Amber", value: "inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 text-slate-900 font-semibold hover:bg-amber-400 transition" }, { label: "Rose", value: "inline-flex items-center justify-center rounded-full bg-rose-500 px-6 py-3 text-white font-semibold hover:bg-rose-600 transition" }], preview: "chip" },
    "buttons.secondary": { label: "Secondary button", options: [{ label: "Light", value: "inline-flex items-center justify-center rounded-full bg-white border border-slate-200 px-6 py-3 text-slate-900 font-semibold hover:bg-slate-100 transition" }, { label: "Warm", value: "inline-flex items-center justify-center rounded-full bg-white border border-amber-200 px-6 py-3 text-amber-800 font-semibold hover:bg-amber-50 transition" }, { label: "Rose", value: "inline-flex items-center justify-center rounded-full bg-white border border-rose-200 px-6 py-3 text-rose-700 font-semibold hover:bg-rose-50 transition" }], preview: "chip" },
    "buttons.outline": { label: "Outline button", options: [{ label: "Slate", value: "inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-slate-900 hover:border-amber-400 transition" }, { label: "Amber", value: "inline-flex items-center justify-center rounded-full border border-amber-300 px-5 py-2 text-amber-700 hover:border-amber-500 transition" }], preview: "chip" },
  };

  return specs[path] ?? { label: path.replace(/\./g, " ") };
}
