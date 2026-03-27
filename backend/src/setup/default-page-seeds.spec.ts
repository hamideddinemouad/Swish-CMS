import { DEFAULT_PAGE_SEEDS } from './default-page-seeds';

describe('DEFAULT_PAGE_SEEDS', () => {
  it('contains the expected default pages in order', () => {
    expect(DEFAULT_PAGE_SEEDS).toHaveLength(6);
    expect(DEFAULT_PAGE_SEEDS.map((seed) => seed.slug)).toEqual([
      'home',
      'about',
      'articles',
      'categories',
      'contact',
      'faq',
    ]);
    expect(DEFAULT_PAGE_SEEDS.map((seed) => seed.page.page)).toEqual([
      'home',
      'about',
      'articles',
      'categories',
      'contact',
      'faq',
    ]);
    expect(DEFAULT_PAGE_SEEDS.map((seed) => seed.title)).toEqual([
      'Home',
      'About',
      'Articles',
      'Categories',
      'Contact',
      'FAQ',
    ]);
  });
});
