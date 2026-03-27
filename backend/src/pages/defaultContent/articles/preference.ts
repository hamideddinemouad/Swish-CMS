import type { DefaultPagePreferences } from '../types';

export type ArticlesPreferences = DefaultPagePreferences;

export const preferences = {
  theme: {
    colorScheme: {
      primary: "bg-slate-900 text-white hover:bg-slate-800",
      secondary: "bg-emerald-600 text-slate-950 hover:bg-emerald-500",
      accent: "text-emerald-400",
    },
    background: "bg-slate-950",
    surface: "bg-slate-900/70 backdrop-blur",
    text: {
      primary: "text-slate-100",
      secondary: "text-slate-300",
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
    container: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
    sectionSpacing: "py-16 md:py-24",
    gap: "gap-6",
  },
  borders: {
    radius: {
      sm: "rounded-sm",
      md: "rounded-lg",
      lg: "rounded-2xl",
      full: "rounded-full",
    },
    style: "border border-slate-800",
  },
  shadow: {
    card: "shadow-2xl",
    modal: "shadow-2xl",
    none: "shadow-none",
  },
  buttons: {
    primary:
      "inline-flex items-center justify-center rounded-full bg-emerald-500 px-6 py-3 text-slate-950 font-semibold tracking-wide hover:bg-emerald-400 transition",
    secondary:
      "inline-flex items-center justify-center rounded-full bg-slate-800 border border-slate-700 px-6 py-3 text-slate-100 font-semibold hover:bg-slate-700 transition",
    outline:
      "inline-flex items-center justify-center rounded-full border border-slate-600 px-5 py-2 text-slate-200 hover:border-emerald-400 transition",
  },
  cards: {
    base: "rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl p-8",
    compact: "rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl p-6",
  },
  navigation: {
    wrapper: "w-full border-b border-slate-800 bg-slate-950/90 shadow-lg",
    inner:
      "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20",
    link: "text-sm font-medium text-slate-200 hover:text-white transition",
    linkActive: "text-sm font-medium text-emerald-400",
  },
  hero: {
    wrapper: "py-24 md:py-32 bg-gradient-to-b from-slate-950 to-slate-900",
    title: "text-4xl md:text-6xl leading-tight font-semibold tracking-tight text-white",
    subtitle: "mt-4 text-lg md:text-xl text-slate-300 max-w-3xl",
    ctaGroup: "mt-10 flex flex-wrap gap-4",
  },
  footer: {
    wrapper: "border-t border-slate-800 bg-slate-950 py-10",
    text: "text-sm text-slate-400",
    link: "text-sm text-emerald-300 hover:text-emerald-200 transition",
  },
} satisfies ArticlesPreferences;
