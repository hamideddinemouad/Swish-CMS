import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Page } from '../pages/entities/page.entity';
import { Component } from './entities/component.entity';
import { ComponentsService } from './components.service';

describe('ComponentsService', () => {
  let service: ComponentsService;
  const componentsRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
    merge: jest.fn(),
  };
  const pagesRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ComponentsService,
        {
          provide: getRepositoryToken(Component),
          useValue: componentsRepository,
        },
        {
          provide: getRepositoryToken(Page),
          useValue: pagesRepository,
        },
      ],
    }).compile();

    service = module.get<ComponentsService>(ComponentsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('replaces page component content and preserves preference', async () => {
    pagesRepository.findOne.mockResolvedValue({
      id: 'page-123',
      tenantId: 'tenant-123',
      slug: 'categories',
    });
    componentsRepository.findOne.mockResolvedValue({
      id: 'component-123',
      pageId: 'page-123',
      title: 'Categories',
      data: {
        hero: {
          title: 'Old title',
          ctaText: 'Old CTA',
        },
        footer: {
          text: 'Keep me',
        },
        tags: ['old'],
      },
      preference: {
        hero: {
          wrapper: 'old-wrapper',
        },
      },
    });
    componentsRepository.save.mockImplementation(async (component) => component);

    const result = await service.updatePageContent('tenant-123', 'categories', {
      data: {
        hero: {
          title: 'New title',
        },
      },
    });

    expect(result.data).toEqual({
      hero: {
        title: 'New title',
      },
    });
    expect(result.preference).toEqual({
      hero: {
        wrapper: 'old-wrapper',
      },
    });
  });

  it('throws when the page does not exist for the tenant', async () => {
    pagesRepository.findOne.mockResolvedValue(null);

    await expect(
      service.updatePageContent('tenant-123', 'missing', {
        data: { hero: { title: 'Hello' } },
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('throws when the page has no component row', async () => {
    pagesRepository.findOne.mockResolvedValue({
      id: 'page-123',
      tenantId: 'tenant-123',
      slug: 'categories',
    });
    componentsRepository.findOne.mockResolvedValue(null);

    await expect(
      service.updatePageContent('tenant-123', 'categories', {
        data: { hero: { title: 'Hello' } },
      }),
    ).rejects.toThrow(NotFoundException);
  });

  it('replaces page component preference and preserves content', async () => {
    pagesRepository.findOne.mockResolvedValue({
      id: 'page-123',
      tenantId: 'tenant-123',
      slug: 'categories',
    });
    componentsRepository.findOne.mockResolvedValue({
      id: 'component-123',
      pageId: 'page-123',
      title: 'Categories',
      data: {
        hero: {
          title: 'Keep me',
        },
      },
      preference: {
        hero: {
          wrapper: 'old-wrapper',
        },
        footer: {
          text: 'old-text',
        },
      },
    });
    componentsRepository.save.mockImplementation(async (component) => component);

    const result = await service.updatePagePreference('tenant-123', 'categories', {
      preference: {
        hero: {
          wrapper: 'new-wrapper',
        },
      },
    });

    expect(result.data).toEqual({
      hero: {
        title: 'Keep me',
      },
    });
    expect(result.preference).toEqual({
      hero: {
        wrapper: 'new-wrapper',
      },
    });
  });
});
