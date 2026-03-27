import type { DefaultPagePreferences } from '../types';

export type ContactPreferences = DefaultPagePreferences;

export const preferences = {
  theme: {
    colorScheme: {
      primary: "bg-emerald-600 text-white hover:bg-emerald-500",
      secondary: "bg-white text-emerald-700 hover:bg-emerald-50",
      accent: "text-emerald-500",
    },
    background: "bg-gradient-to-b from-white to-emerald-50",
    surface: "bg-white/90",
    text: {
      primary: "text-emerald-900",
      secondary: "text-emerald-600",
    },
  },
  typography: {
    headingFont: "font-serif",
    bodyFont: "font-sans",
    headingWeight: "font-semibold",
    bodyWeight: "font-normal",
    headingSizes: {
      h1: "text-4xl md:text-6xl",
      h2: "text-3xl md:text-4xl",
      h3: "text-2xl md:text-3xl",
    },
    bodySize: "text-base",
    smallSize: "text-sm",
  },
  layout: {
    container: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
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
    style: "border border-emerald-100",
  },
  shadow: {
    card: "shadow-xl",
    modal: "shadow-2xl",
    none: "shadow-none",
  },
  buttons: {
    primary:
      "inline-flex items-center justify-center rounded-full bg-emerald-600 px-6 py-3 text-white font-semibold hover:bg-emerald-500 transition",
    secondary:
      "inline-flex items-center justify-center rounded-full bg-white border border-emerald-200 px-6 py-3 text-emerald-700 font-semibold hover:bg-emerald-50 transition",
    outline:
      "inline-flex items-center justify-center rounded-full border border-emerald-300 px-5 py-2 text-emerald-600 hover:border-emerald-400 transition",
  },
  cards: {
    base: "rounded-3xl bg-white/90 border border-emerald-100 shadow-xl p-8",
    compact: "rounded-2xl bg-white/80 border border-emerald-100 shadow-md p-6",
  },
  navigation: {
    wrapper: "w-full border-b border-emerald-100 bg-white/90",
    inner:
      "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20",
    link: "text-sm font-medium text-emerald-700 hover:text-emerald-500 transition",
    linkActive: "text-sm font-medium text-emerald-600",
  },
  hero: {
    wrapper: "py-24 md:py-32 bg-white",
    title: "text-4xl md:text-6xl font-semibold tracking-tight text-emerald-900",
    subtitle: "mt-4 text-lg md:text-xl text-emerald-600 max-w-3xl",
    ctaGroup: "mt-8 flex flex-wrap gap-4",
  },
  footer: {
    wrapper: "border-t border-emerald-100 bg-white py-10",
    text: "text-sm text-emerald-600",
    link: "text-sm text-emerald-700 hover:text-emerald-500 transition",
  },
} satisfies ContactPreferences;
