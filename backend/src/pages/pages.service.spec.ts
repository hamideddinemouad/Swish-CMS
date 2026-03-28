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

  it('returns all pages for a tenant', async () => {
    pagesRepository.find.mockResolvedValue([
      {
        id: 'page-123',
        tenantId: 'tenant-123',
        slug: 'home',
        title: 'Home',
      },
      {
        id: 'page-456',
        tenantId: 'tenant-123',
        slug: 'categories',
        title: 'Categories',
      },
    ]);

    await expect(service.findByTenant('tenant-123')).resolves.toEqual([
      {
        id: 'page-123',
        tenantId: 'tenant-123',
        slug: 'home',
        title: 'Home',
      },
      {
        id: 'page-456',
        tenantId: 'tenant-123',
        slug: 'categories',
        title: 'Categories',
      },
    ]);

    expect(pagesRepository.find).toHaveBeenCalledWith({
      where: { tenantId: 'tenant-123' },
    });
  });

  it('returns all pages for a subdomain', async () => {
    pagesRepository.query.mockResolvedValue([
      {
        slug: 'home',
        title: 'Home',
      },
      {
        slug: 'about',
        title: 'About',
      },
    ]);

    await expect(service.findBySubdomain('acme')).resolves.toEqual([
      {
        slug: 'home',
        title: 'Home',
      },
      {
        slug: 'about',
        title: 'About',
      },
    ]);

    expect(pagesRepository.query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE t.subdomain = $1'),
      ['acme'],
    );
  });

  it('throws when the page does not exist for the tenant subdomain', async () => {
    pagesRepository.query.mockResolvedValue([]);

    await expect(service.findBySubdomainAndPageName('acme', 'missing')).rejects.toThrow(
      'Page missing for tenant acme not found',
    );
  });

  it('disables a component in the page components json', async () => {
    pagesRepository.findOne.mockResolvedValue({
      id: 'page-123',
      tenantId: 'tenant-123',
      slug: 'categories',
      components: [
        { type: 'hero', enabled: true },
        { type: 'newsletter', enabled: true, variant: 'default' },
      ],
    });
    pagesRepository.save.mockImplementation(async (page) => page);

    const result = await service.disableComponent(
      'tenant-123',
      'categories',
      'newsletter',
    );

    expect(pagesRepository.findOne).toHaveBeenCalledWith({
      where: {
        tenantId: 'tenant-123',
        slug: 'categories',
      },
    });
    expect(result.components).toEqual([
      { type: 'hero', enabled: true },
      { type: 'newsletter', enabled: false, variant: 'default' },
    ]);
  });

  it('throws when the component type is not present on the page', async () => {
    pagesRepository.findOne.mockResolvedValue({
      id: 'page-123',
      tenantId: 'tenant-123',
      slug: 'categories',
      components: [{ type: 'hero', enabled: true }],
    });

    await expect(
      service.disableComponent('tenant-123', 'categories', 'newsletter'),
    ).rejects.toThrow('Component newsletter not found on page categories');
  });

  it('deletes a page by tenant and page name', async () => {
    pagesRepository.delete.mockResolvedValue({ affected: 1 });

    await expect(
      service.removeByTenantAndPageName('tenant-123', 'categories'),
    ).resolves.toBeUndefined();

    expect(pagesRepository.delete).toHaveBeenCalledWith({
      tenantId: 'tenant-123',
      slug: 'categories',
    });
  });

  it('throws when deleting a missing page by tenant and page name', async () => {
    pagesRepository.delete.mockResolvedValue({ affected: 0 });

    await expect(
      service.removeByTenantAndPageName('tenant-123', 'missing'),
    ).rejects.toThrow('Page missing not found for tenant tenant-123');
  });
});
