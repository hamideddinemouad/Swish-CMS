import type { DefaultPageSeed, DefaultPageTemplate } from '../../pages/defaultContent/types';
import { DEFAULT_PAGE_SEEDS } from '../default-page-seeds';
import { createTemplateSeeds } from './shared';

const homeSeed = DEFAULT_PAGE_SEEDS.find((seed) => seed.slug === 'home') as DefaultPageSeed;
const homeSeedData = homeSeed.data as Record<string, any>;
const consultingPreference = {
  theme: {
    colorScheme: {
      primary: 'bg-slate-950 text-white hover:bg-slate-900',
      secondary: 'bg-emerald-400 text-slate-950 hover:bg-emerald-300',
      accent: 'text-emerald-400',
    },
    background: 'bg-slate-950',
    surface: 'bg-slate-900/70 backdrop-blur',
    text: {
      primary: 'text-slate-100',
      secondary: 'text-slate-300',
    },
  },
  typography: {
    headingFont: 'font-sans',
    bodyFont: 'font-sans',
    headingWeight: 'font-semibold',
    bodyWeight: 'font-normal',
    headingSizes: {
      h1: 'text-4xl md:text-6xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-2xl md:text-3xl',
    },
    bodySize: 'text-base',
    smallSize: 'text-sm',
  },
  borders: {
    style: 'border border-slate-800',
  },
  buttons: {
    primary:
      'inline-flex items-center justify-center rounded-full bg-emerald-400 px-6 py-3 text-slate-950 font-semibold hover:bg-emerald-300 transition',
    secondary:
      'inline-flex items-center justify-center rounded-full bg-slate-900 border border-slate-700 px-6 py-3 text-slate-100 font-semibold hover:bg-slate-800 transition',
    outline:
      'inline-flex items-center justify-center rounded-full border border-slate-700 px-5 py-2 text-slate-100 hover:border-emerald-400 transition',
  },
  cards: {
    base: 'rounded-3xl bg-slate-900/70 border border-slate-800 shadow-2xl p-8',
    compact: 'rounded-2xl bg-slate-900/60 border border-slate-800 shadow-xl p-6',
  },
  navigation: {
    wrapper: 'w-full border-b border-slate-800 bg-slate-950/90',
    link: 'text-sm font-medium text-slate-300 hover:text-white transition',
    linkActive: 'text-sm font-medium text-emerald-400',
  },
  hero: {
    wrapper: 'py-24 md:py-32 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950',
    title: 'text-4xl md:text-6xl font-semibold leading-tight text-white',
    subtitle: 'mt-4 text-lg md:text-xl text-slate-300 max-w-3xl',
  },
  footer: {
    wrapper: 'border-t border-slate-800 bg-slate-950 py-10',
    text: 'text-sm text-slate-400',
    link: 'text-sm text-emerald-300 hover:text-emerald-200 transition',
  },
} as const;

export const consultingTemplate = {
  id: 'consulting',
  label: 'Consulting',
  seeds: createTemplateSeeds(DEFAULT_PAGE_SEEDS, {
    home: {
      data: {
        ...homeSeed.data,
        hero: {
          title: 'Strategy and delivery support for teams navigating complex change',
          subtitle:
            'Position your firm with a service-led homepage focused on trust, outcomes, and conversion.',
          ctaPrimary: 'Book a consultation',
          ctaSecondary: 'See services',
          image: homeSeedData.hero.image,
        },
      } as DefaultPageSeed['data'],
      preference: {
        ...consultingPreference,
      },
    },
    about: {
      preference: consultingPreference,
      enabledComponents: ['nav', 'hero', 'mission', 'values', 'stats', 'testimonials', 'footer'],
    },
    articles: {
      preference: consultingPreference,
    },
    categories: {
      preference: consultingPreference,
    },
    contact: {
      preference: consultingPreference,
      enabledComponents: ['nav', 'hero', 'contactInfo', 'form', 'faq', 'footer'],
    },
    faq: {
      preference: consultingPreference,
    },
  }),
} satisfies DefaultPageTemplate;
