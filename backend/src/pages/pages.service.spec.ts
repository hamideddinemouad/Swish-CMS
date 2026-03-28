import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
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
    query: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PagesService,
        {
          provide: getRepositoryToken(Page),
          useValue: pagesRepository,
        },
      ],
    }).compile();

    service = module.get<PagesService>(PagesService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the page for a tenant subdomain and page name', async () => {
    pagesRepository.query.mockResolvedValue([
      {
        slug: 'about',
        components: [{ type: 'hero' }],
        data: { heading: 'Hello' },
        preference: { width: 'full' },
      },
    ]);

    await expect(service.findBySubdomainAndPageName('acme', 'about')).resolves.toEqual({
      slug: 'about',
      components: [{ type: 'hero' }],
      data: { heading: 'Hello' },
      preference: { width: 'full' },
    });

    expect(pagesRepository.query).toHaveBeenCalledWith(
      expect.stringContaining('FROM pages p'),
      ['acme', 'about'],
    );
  });

  it('throws when the page does not exist for the tenant subdomain', async () => {
    pagesRepository.query.mockResolvedValue([]);

    await expect(service.findBySubdomainAndPageName('acme', 'missing')).rejects.toThrow(
      'Page missing for tenant acme not found',
    );
  });
});
