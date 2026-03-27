import type { DefaultPagePreferences } from '../types';

export type CategoriesPreferences = DefaultPagePreferences;

export const preferences = {
  theme: {
    colorScheme: {
      primary: "bg-orange-500 text-white hover:bg-orange-600",
      secondary: "bg-white text-orange-500 hover:bg-orange-50",
      accent: "text-orange-400",
    },
    background: "bg-gradient-to-br from-orange-50 via-white to-pink-50",
    surface: "bg-white/90 backdrop-blur-sm",
    text: {
      primary: "text-slate-900",
      secondary: "text-slate-600",
    },
  },
  typography: {
    headingFont: "font-serif",
    bodyFont: "font-sans",
    headingWeight: "font-semibold",
    bodyWeight: "font-normal",
    headingSizes: {
      h1: "text-4xl md:text-5xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
    },
    bodySize: "text-base",
    smallSize: "text-sm",
  },
  layout: {
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    sectionSpacing: "py-16 md:py-24",
    gap: "gap-6",
  },
  borders: {
    radius: {
      sm: "rounded-md",
      md: "rounded-xl",
      lg: "rounded-2xl",
      full: "rounded-full",
    },
    style: "border border-orange-100",
  },
  shadow: {
    card: "shadow-xl",
    modal: "shadow-2xl",
    none: "shadow-none",
  },
  buttons: {
    primary:
      "inline-flex items-center justify-center rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600 transition",
    secondary:
      "inline-flex items-center justify-center rounded-full bg-white border border-orange-200 px-6 py-3 text-orange-600 font-semibold hover:bg-orange-50 transition",
    outline:
      "inline-flex items-center justify-center rounded-full border border-orange-300 px-5 py-2 text-orange-500 hover:border-pink-300 transition",
  },
  cards: {
    base: "rounded-3xl bg-white/80 border border-orange-100 shadow-xl p-8",
    compact: "rounded-2xl bg-white/70 border border-orange-100 shadow-md p-6",
  },
  navigation: {
    wrapper: "w-full border-b border-orange-100 bg-white/90",
    inner:
      "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20",
    link: "text-sm font-medium text-slate-800 hover:text-orange-500 transition",
    linkActive: "text-sm font-medium text-orange-500",
  },
  hero: {
    wrapper: "py-24 md:py-32 bg-gradient-to-b from-orange-50 to-white",
    title: "text-4xl md:text-6xl font-semibold tracking-tight text-slate-900",
    subtitle: "mt-4 text-lg md:text-xl text-slate-600 max-w-3xl",
    ctaGroup: "mt-8 flex flex-wrap gap-4",
  },
  footer: {
    wrapper: "border-t border-orange-100 bg-white py-10",
    text: "text-sm text-slate-500",
    link: "text-sm text-orange-500 hover:text-orange-400 transition",
  },
} satisfies CategoriesPreferences;
