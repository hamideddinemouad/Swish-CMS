import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Component } from '../components/entities/component.entity';
import { Page } from '../pages/entities/page.entity';
import { data as aboutData } from '../pages/defaultContent/about/data';
import { preferences as aboutPreferences } from '../pages/defaultContent/about/preference';
import { data as articlesData } from '../pages/defaultContent/articles/data';
import { preferences as articlesPreferences } from '../pages/defaultContent/articles/preference';
import { data as categoriesData } from '../pages/defaultContent/categories/data';
import { preferences as categoriesPreferences } from '../pages/defaultContent/categories/preference';
import { data as contactData } from '../pages/defaultContent/contact/data';
import { preferences as contactPreferences } from '../pages/defaultContent/contact/preference';
import { data as faqData } from '../pages/defaultContent/faq/data';
import { preferences as faqPreferences } from '../pages/defaultContent/faq/preference';
import { data as homeData } from '../pages/defaultContent/home/data';
import { preferences as homePreferences } from '../pages/defaultContent/home/preference';
import { DEFAULT_PAGE_SEEDS } from './default-page-seeds';
import { SetupService } from './setup.service';

describe('SetupService', () => {
  let service: SetupService;
  const pagesRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };
  const componentsRepository = {
    create: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SetupService,
        {
          provide: getRepositoryToken(Page),
          useValue: pagesRepository,
        },
        {
          provide: getRepositoryToken(Component),
          useValue: componentsRepository,
        },
      ],
    }).compile();

    service = module.get<SetupService>(SetupService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates default pages and one component per page', async () => {
    pagesRepository.create.mockImplementation((page) => page);
    pagesRepository.save.mockResolvedValue(
      DEFAULT_PAGE_SEEDS.map((seed) => ({
        id: `page-${seed.slug}`,
        slug: seed.slug,
      })),
    );
    componentsRepository.create.mockImplementation((component) => component);
    componentsRepository.save.mockResolvedValue([]);

    await expect(service.setup('tenant-123')).resolves.toEqual({
      status: 'ok',
      tenantId: 'tenant-123',
      pagesCreated: DEFAULT_PAGE_SEEDS.length,
      componentsCreated: DEFAULT_PAGE_SEEDS.length,
    });

    expect(pagesRepository.save).toHaveBeenCalledTimes(1);
    expect(componentsRepository.save).toHaveBeenCalledTimes(1);
    expect(
      pagesRepository.save.mock.invocationCallOrder[0],
    ).toBeLessThan(componentsRepository.save.mock.invocationCallOrder[0]);

    expect(componentsRepository.create.mock.calls.map(([component]) => component)).toEqual([
      {
        pageId: 'page-home',
        title: 'Home',
        data: homeData,
        preference: homePreferences,
      },
      {
        pageId: 'page-about',
        title: 'About',
        data: aboutData,
        preference: aboutPreferences,
      },
      {
        pageId: 'page-articles',
        title: 'Articles',
        data: articlesData,
        preference: articlesPreferences,
      },
      {
        pageId: 'page-categories',
        title: 'Categories',
        data: categoriesData,
        preference: categoriesPreferences,
      },
      {
        pageId: 'page-contact',
        title: 'Contact',
        data: contactData,
        preference: contactPreferences,
      },
      {
        pageId: 'page-faq',
        title: 'FAQ',
        data: faqData,
        preference: faqPreferences,
      },
    ]);
  });

  it('returns an error status when component seeding fails', async () => {
    pagesRepository.create.mockImplementation((page) => page);
    pagesRepository.save.mockResolvedValue(
      DEFAULT_PAGE_SEEDS.map((seed) => ({
        id: `page-${seed.slug}`,
        slug: seed.slug,
      })),
    );
    componentsRepository.create.mockImplementation((component) => component);
    componentsRepository.save.mockRejectedValue(new Error('boom'));

    await expect(service.setup('tenant-123')).resolves.toEqual({
      status: 'error',
      message: 'boom',
    });
  });
});
