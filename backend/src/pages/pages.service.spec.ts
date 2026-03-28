import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Component } from '../components/entities/component.entity';
import { Page } from './entities/page.entity';
import { PagesService } from './pages.service';

describe('PagesService', () => {
  let service: PagesService;
  const pagesRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };
  const componentsRepository = {
    find: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagesService,
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

    service = module.get<PagesService>(PagesService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the page for a tenant subdomain and page name', async () => {
    const page = {
      id: 'page-123',
      slug: 'about',
      title: 'About',
    };
    pagesRepository.findOne.mockResolvedValue(page);
    componentsRepository.find.mockResolvedValue([
      {
        id: 'component-1',
        title: 'Hero',
        data: { heading: 'Hello' },
        preference: { width: 'full' },
      },
    ]);

    await expect(service.findBySubdomainAndPageName('acme', 'about')).resolves.toEqual({
      ...page,
      componentDetails: [
        {
          id: 'component-1',
          title: 'Hero',
          data: { heading: 'Hello' },
          preference: { width: 'full' },
        },
      ],
    });

    expect(pagesRepository.findOne).toHaveBeenCalledWith({
      where: {
        slug: 'about',
        tenant: {
          subdomain: 'acme',
        },
      },
    });
    expect(componentsRepository.find).toHaveBeenCalledWith({
      where: {
        pageId: 'page-123',
      },
      select: {
        id: true,
        title: true,
        data: true,
        preference: true,
      },
    });
  });

  it('throws when the page does not exist for the tenant subdomain', async () => {
    pagesRepository.findOne.mockResolvedValue(null);

    await expect(service.findBySubdomainAndPageName('acme', 'missing')).rejects.toThrow(
      'Page missing for tenant acme not found',
    );
  });
});
