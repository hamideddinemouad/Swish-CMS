import { data as aboutData } from '../pages/defaultContent/about/data';
import { page as aboutPage } from '../pages/defaultContent/about/page';
import { preferences as aboutPreferences } from '../pages/defaultContent/about/preference';
import { data as articlesData } from '../pages/defaultContent/articles/data';
import { page as articlesPage } from '../pages/defaultContent/articles/page';
import { preferences as articlesPreferences } from '../pages/defaultContent/articles/preference';
import { data as categoriesData } from '../pages/defaultContent/categories/data';
import { page as categoriesPage } from '../pages/defaultContent/categories/page';
import { preferences as categoriesPreferences } from '../pages/defaultContent/categories/preference';
import { data as contactData } from '../pages/defaultContent/contact/data';
import { page as contactPage } from '../pages/defaultContent/contact/page';
import { preferences as contactPreferences } from '../pages/defaultContent/contact/preference';
import { data as faqData } from '../pages/defaultContent/faq/data';
import { page as faqPage } from '../pages/defaultContent/faq/page';
import { preferences as faqPreferences } from '../pages/defaultContent/faq/preference';
import { data as homeData } from '../pages/defaultContent/home/data';
import { page as homePage } from '../pages/defaultContent/home/page';
import { preferences as homePreferences } from '../pages/defaultContent/home/preference';
import type { DefaultPageSeed } from '../pages/defaultContent/types';

export const DEFAULT_PAGE_SEEDS = [
  {
    slug: homePage.page,
    title: 'Home',
    page: homePage,
    data: homeData,
    preference: homePreferences,
  },
  {
    slug: aboutPage.page,
    title: 'About',
    page: aboutPage,
    data: aboutData,
    preference: aboutPreferences,
  },
  {
    slug: articlesPage.page,
    title: 'Articles',
    page: articlesPage,
    data: articlesData,
    preference: articlesPreferences,
  },
  {
    slug: categoriesPage.page,
    title: 'Categories',
    page: categoriesPage,
    data: categoriesData,
    preference: categoriesPreferences,
  },
  {
    slug: contactPage.page,
    title: 'Contact',
    page: contactPage,
    data: contactData,
    preference: contactPreferences,
  },
  {
    slug: faqPage.page,
    title: 'FAQ',
    page: faqPage,
    data: faqData,
    preference: faqPreferences,
  },
] as const satisfies readonly DefaultPageSeed[];
