import type { DefaultPageSeed, DefaultPageTemplate } from '../../pages/defaultContent/types';
import { DEFAULT_PAGE_SEEDS } from '../default-page-seeds';
import { createTemplateSeeds } from './shared';

const homeSeed = DEFAULT_PAGE_SEEDS.find((seed) => seed.slug === 'home') as DefaultPageSeed;
const homeSeedData = homeSeed.data as Record<string, any>;
const minimalPreference = {
  theme: {
    colorScheme: {
      primary: 'bg-stone-900 text-stone-50 hover:bg-stone-800',
      secondary: 'bg-white text-stone-900 hover:bg-stone-100',
      accent: 'text-stone-700',
    },
    background: 'bg-stone-50',
    surface: 'bg-white',
    text: {
      primary: 'text-stone-900',
      secondary: 'text-stone-600',
    },
  },
  typography: {
    headingFont: 'font-serif',
    bodyFont: 'font-sans',
    headingWeight: 'font-medium',
    bodyWeight: 'font-normal',
    headingSizes: {
      h1: 'text-4xl md:text-5xl',
      h2: 'text-3xl md:text-4xl',
      h3: 'text-2xl md:text-3xl',
    },
    bodySize: 'text-base',
    smallSize: 'text-sm',
  },
  borders: {
    style: 'border border-stone-200',
  },
  buttons: {
    primary:
      'inline-flex items-center justify-center rounded-full bg-stone-900 px-6 py-3 text-stone-50 font-medium hover:bg-stone-800 transition',
    secondary:
      'inline-flex items-center justify-center rounded-full bg-white border border-stone-200 px-6 py-3 text-stone-900 font-medium hover:bg-stone-50 transition',
    outline:
      'inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-2 text-stone-700 hover:bg-stone-100 transition',
  },
  cards: {
    base: 'rounded-3xl bg-white border border-stone-200 shadow-sm p-8',
    compact: 'rounded-2xl bg-white border border-stone-200 shadow-sm p-6',
  },
  navigation: {
    wrapper: 'w-full border-b border-stone-200 bg-stone-50/90',
    link: 'text-sm font-medium text-stone-700 hover:text-stone-950 transition',
    linkActive: 'text-sm font-medium text-stone-950',
  },
  hero: {
    wrapper: 'py-20 md:py-24 bg-stone-50',
    title: 'text-4xl md:text-5xl font-medium leading-tight text-stone-950',
    subtitle: 'mt-4 text-lg md:text-xl text-stone-600 max-w-3xl',
  },
  footer: {
    wrapper: 'border-t border-stone-200 bg-stone-50 py-10',
    text: 'text-sm text-stone-500',
    link: 'text-sm text-stone-800 hover:text-stone-950 transition',
  },
} as const;

export const minimalTemplate = {
  id: 'minimal',
  label: 'Minimal',
  seeds: createTemplateSeeds(DEFAULT_PAGE_SEEDS, {
    home: {
      data: {
        ...homeSeed.data,
        hero: {
          title: 'A calm starting point for a clear online presence',
          subtitle:
            'Launch with a focused homepage, simple messaging, and room to shape the site over time.',
          ctaPrimary: 'Get started',
          ctaSecondary: 'See examples',
          image: homeSeedData.hero.image,
        },
        offerings: {
          title: 'What this starter gives you',
          description:
            'A lighter starting point with fewer moving parts and cleaner paths for editing.',
          tiles: [
            {
              title: 'Simple messaging',
              detail: 'A homepage and supporting pages with concise copy blocks.',
              action: 'Explore pages',
              slug: '/about',
            },
            {
              title: 'Faster setup',
              detail: 'A reduced component set that is easier to customize from day one.',
              action: 'Open editor',
              slug: '/editor/home/content',
            },
          ],
        },
        testimonials: {
          title: 'Why teams start here',
          quotes: [
            {
              text: 'The simpler structure helped us launch before we overthought the details.',
              name: 'Amina Rahal',
              role: 'Founder',
              company: 'Quiet Current',
            },
          ],
        },
      } as DefaultPageSeed['data'],
      preference: minimalPreference,
      enabledComponents: ['nav', 'hero', 'offerings', 'footer'],
    },
    about: {
      preference: minimalPreference,
      enabledComponents: ['nav', 'hero', 'mission', 'team', 'footer'],
    },
    articles: {
      preference: minimalPreference,
      enabledComponents: ['nav', 'hero', 'featuredArticles', 'newsletter', 'footer'],
    },
    categories: {
      preference: minimalPreference,
      enabledComponents: ['nav', 'hero', 'categoryGrid', 'footer'],
    },
    contact: {
      preference: minimalPreference,
      enabledComponents: ['nav', 'hero', 'contactInfo', 'form', 'footer'],
    },
    faq: {
      preference: minimalPreference,
      enabledComponents: ['nav', 'hero', 'faq', 'footer'],
    },
  }),
} satisfies DefaultPageTemplate;
