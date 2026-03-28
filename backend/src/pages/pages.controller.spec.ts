import { Test, TestingModule } from '@nestjs/testing';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

describe('PagesController', () => {
  let controller: PagesController;
  const pagesService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findBySubdomainAndPageName: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagesController],
      providers: [
        {
          provide: PagesService,
          useValue: pagesService,
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
});
