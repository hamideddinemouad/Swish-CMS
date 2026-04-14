import type { DefaultPageSeed, DefaultPageTemplate } from '../../pages/defaultContent/types';
import { DEFAULT_PAGE_SEEDS } from '../default-page-seeds';
import { createTemplateSeeds } from './shared';

const homeSeed = DEFAULT_PAGE_SEEDS.find((seed) => seed.slug === 'home') as DefaultPageSeed;
const homeSeedData = homeSeed.data as Record<string, any>;
const magazinePreference = {
  theme: {
    colorScheme: {
      primary: 'bg-zinc-950 text-stone-50 hover:bg-zinc-900',
      secondary: 'bg-stone-100 text-zinc-950 hover:bg-stone-200',
      accent: 'text-red-700',
    },
    background: 'bg-stone-100',
    surface: 'bg-white',
    text: {
      primary: 'text-zinc-950',
      secondary: 'text-zinc-600',
    },
  },
  typography: {
    headingFont: 'font-serif',
    bodyFont: 'font-serif',
    headingWeight: 'font-semibold',
    bodyWeight: 'font-normal',
    headingSizes: {
      h1: 'text-5xl md:text-7xl',
      h2: 'text-3xl md:text-5xl',
      h3: 'text-2xl md:text-3xl',
    },
    bodySize: 'text-lg',
    smallSize: 'text-sm',
  },
  borders: {
    style: 'border border-stone-300',
  },
  buttons: {
    primary:
      'inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-stone-50 font-semibold hover:bg-zinc-800 transition',
    secondary:
      'inline-flex items-center justify-center rounded-full bg-white border border-stone-300 px-6 py-3 text-zinc-950 font-semibold hover:bg-stone-50 transition',
    outline:
      'inline-flex items-center justify-center rounded-full border border-red-200 px-5 py-2 text-red-800 hover:bg-red-50 transition',
  },
  cards: {
    base: 'rounded-3xl bg-white border border-stone-300 shadow-lg p-8',
    compact: 'rounded-2xl bg-white border border-stone-300 shadow-md p-6',
  },
  navigation: {
    wrapper: 'w-full border-b border-stone-300 bg-stone-100/95',
    link: 'text-sm font-medium text-zinc-700 hover:text-zinc-950 transition',
    linkActive: 'text-sm font-medium text-red-700',
  },
  hero: {
    wrapper: 'py-24 md:py-32 bg-gradient-to-b from-stone-100 to-white',
    title: 'text-5xl md:text-7xl leading-none font-semibold tracking-tight text-zinc-950',
    subtitle: 'mt-5 text-xl text-zinc-600 max-w-3xl',
  },
  footer: {
    wrapper: 'border-t border-stone-300 bg-stone-100 py-10',
    text: 'text-sm text-zinc-600',
    link: 'text-sm text-red-700 hover:text-red-600 transition',
  },
} as const;

export const magazineTemplate = {
  id: 'magazine',
  label: 'Magazine',
  seeds: createTemplateSeeds(DEFAULT_PAGE_SEEDS, {
    home: {
      data: {
        ...homeSeed.data,
        hero: {
          title: 'A publishing-ready front page for stories, essays, and dispatches',
          subtitle:
            'Lead with editorial voice, featured stories, and recurring reader touchpoints from day one.',
          ctaPrimary: 'Read the latest',
          ctaSecondary: 'Join the newsletter',
          image: homeSeedData.hero.image,
        },
      } as DefaultPageSeed['data'],
      preference: {
        ...magazinePreference,
      },
    },
    articles: {
      preference: magazinePreference,
    },
    categories: {
      preference: magazinePreference,
      enabledComponents: ['nav', 'hero', 'categoryGrid', 'featuredCollections', 'newsletter', 'footer'],
    },
    about: {
      preference: magazinePreference,
    },
    contact: {
      preference: magazinePreference,
    },
    faq: {
      preference: magazinePreference,
    },
  }),
} satisfies DefaultPageTemplate;
