import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ComponentsService } from '../components/components.service';
import { AccessGuard } from '../auth/guards/access.guard';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

describe('PagesController', () => {
  let controller: PagesController;
  const pagesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findByTenant: jest.fn(),
    findBySubdomainAndPageName: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    disableComponent: jest.fn(),
    removeByTenantAndPageName: jest.fn(),
    remove: jest.fn(),
  };
  const componentsService = {
    updatePageContent: jest.fn(),
    updatePagePreference: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [
        {
          provide: PagesService,
          useValue: pagesService,
        },
        {
          provide: ComponentsService,
          useValue: componentsService,
        },
        {
          provide: AccessGuard,
          useValue: { canActivate: jest.fn().mockReturnValue(true) },
        },
        {
          provide: JwtService,
          useValue: { verifyAsync: jest.fn() },
        },
      ],
    }).compile();

    controller = module.get<PagesController>(PagesController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns a page for the tenant subdomain and page name', async () => {
    pagesService.findBySubdomainAndPageName.mockResolvedValue({
      id: 'page-123',
      slug: 'about',
      title: 'About',
      componentDetails: [
        {
          id: 'component-1',
          title: 'Hero',
          data: { heading: 'Hello' },
          preference: { width: 'full' },
        },
      ],
    });

    const getResult = await controller.getBySubdomainAndPageName('acme', 'about');

    expect(pagesService.findBySubdomainAndPageName).toHaveBeenCalledWith('acme', 'about');
    expect(getResult).toEqual({
      id: 'page-123',
      slug: 'about',
      title: 'About',
      componentDetails: [
        {
          id: 'component-1',
          title: 'Hero',
          data: { heading: 'Hello' },
          preference: { width: 'full' },
        },
      ],
    });
  });

  it('returns all pages for the authenticated tenant', async () => {
    pagesService.findByTenant.mockResolvedValue([
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

    const result = await controller.findByTenant({
      sub: 'user-123',
      email: 'editor@example.com',
      tenantId: 'tenant-123',
      tenantSubdomain: 'acme',
      type: 'access',
    });

    expect(pagesService.findByTenant).toHaveBeenCalledWith('tenant-123');
    expect(result).toEqual([
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
  });

  it('delegates page component content updates to the components service', async () => {
    componentsService.updatePageContent.mockResolvedValue({
      id: 'component-123',
      pageId: 'page-123',
      title: 'Categories',
      data: {
        hero: {
          title: 'New title',
        },
      },
      preference: {
        hero: {
          wrapper: 'old-wrapper',
        },
      },
    });

    const result = await controller.updateComponentContent(
      'categories',
      {
        data: {
          hero: {
            title: 'New title',
          },
        },
      },
      {
        sub: 'user-123',
        email: 'editor@example.com',
        tenantId: 'tenant-123',
        tenantSubdomain: 'acme',
        type: 'access',
      },
    );

    expect(componentsService.updatePageContent).toHaveBeenCalledWith(
      'tenant-123',
      'categories',
      {
        data: {
          hero: {
            title: 'New title',
          },
        },
      },
    );
    expect(result).toEqual({
      id: 'component-123',
      pageId: 'page-123',
      title: 'Categories',
      data: {
        hero: {
          title: 'New title',
        },
      },
      preference: {
        hero: {
          wrapper: 'old-wrapper',
        },
      },
    });
  });

  it('delegates page component preference updates to the components service', async () => {
    componentsService.updatePagePreference.mockResolvedValue({
      id: 'component-123',
      pageId: 'page-123',
      title: 'Categories',
      data: {
        hero: {
          title: 'Existing title',
        },
      },
      preference: {
        hero: {
          wrapper: 'new-wrapper',
        },
      },
    });

    const result = await controller.updateComponentPreference(
      'categories',
      {
        preference: {
          hero: {
            wrapper: 'new-wrapper',
          },
        },
      },
      {
        sub: 'user-123',
        email: 'editor@example.com',
        tenantId: 'tenant-123',
        tenantSubdomain: 'acme',
        type: 'access',
      },
    );

    expect(componentsService.updatePagePreference).toHaveBeenCalledWith(
      'tenant-123',
      'categories',
      {
        preference: {
          hero: {
            wrapper: 'new-wrapper',
          },
        },
      },
    );
    expect(result).toEqual({
      id: 'component-123',
      pageId: 'page-123',
      title: 'Categories',
      data: {
        hero: {
          title: 'Existing title',
        },
      },
      preference: {
        hero: {
          wrapper: 'new-wrapper',
        },
      },
    });
  });

  it('delegates page component disable updates to the pages service', async () => {
    pagesService.disableComponent.mockResolvedValue({
      id: 'page-123',
      slug: 'categories',
      title: 'Categories',
      components: [
        { type: 'hero', enabled: true },
        { type: 'newsletter', enabled: false },
      ],
    });

    const result = await controller.disableComponent(
      'categories',
      'newsletter',
      {
        sub: 'user-123',
        email: 'editor@example.com',
        tenantId: 'tenant-123',
        tenantSubdomain: 'acme',
        type: 'access',
      },
    );

    expect(pagesService.disableComponent).toHaveBeenCalledWith(
      'tenant-123',
      'categories',
      'newsletter',
    );
    expect(result).toEqual({
      id: 'page-123',
      slug: 'categories',
      title: 'Categories',
      components: [
        { type: 'hero', enabled: true },
        { type: 'newsletter', enabled: false },
      ],
    });
  });

  it('delegates page deletion by tenant and page name to the pages service', async () => {
    pagesService.removeByTenantAndPageName.mockResolvedValue(undefined);

    await expect(
      controller.removeByPageName('categories', {
        sub: 'user-123',
        email: 'editor@example.com',
        tenantId: 'tenant-123',
        tenantSubdomain: 'acme',
        type: 'access',
      }),
    ).resolves.toBeUndefined();

    expect(pagesService.removeByTenantAndPageName).toHaveBeenCalledWith(
      'tenant-123',
      'categories',
    );
  });
});
