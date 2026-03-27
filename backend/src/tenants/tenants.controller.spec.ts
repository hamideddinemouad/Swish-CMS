import { Test, TestingModule } from '@nestjs/testing';
import { TenantsController } from './tenants.controller';
import { TenantsService } from './tenants.service';
import { AccessGuard } from '../auth/guards/access.guard';

describe('TenantsController', () => {
  let controller: TenantsController;
  const tenantsService = {
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TenantsController],
      providers: [
        {
          provide: TenantsService,
          useValue: tenantsService,
        },
      ],
    })
      .overrideGuard(AccessGuard)
      .useValue({
        canActivate: jest.fn(() => true),
      })
      .compile();

    controller = module.get<TenantsController>(TenantsController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns the created tenant', async () => {
    tenantsService.create.mockResolvedValue({
      id: 'tenant-123',
      subdomain: 'acme',
      name: 'Acme',
      settings: {},
      userId: 'user-123',
    });

    const result = await controller.create({
      subdomain: 'acme',
      name: 'Acme',
      userId: 'user-123',
      settings: {},
    });

    expect(tenantsService.create).toHaveBeenCalledWith({
      subdomain: 'acme',
      name: 'Acme',
      userId: 'user-123',
      settings: {},
    });
    expect(result).toEqual({
      id: 'tenant-123',
      subdomain: 'acme',
      name: 'Acme',
      settings: {},
      userId: 'user-123',
    });
  });

  it('returns the tenant', async () => {
    tenantsService.create.mockResolvedValue({
      id: 'tenant-456',
      subdomain: 'blue',
      name: 'Blue',
      settings: {},
      userId: 'user-456',
    });

    const result = await controller.create({
      subdomain: 'blue',
      name: 'Blue',
      userId: 'user-456',
      settings: {},
    });

    expect(tenantsService.create).toHaveBeenCalledWith({
      subdomain: 'blue',
      name: 'Blue',
      userId: 'user-456',
      settings: {},
    });
    expect(result).toEqual({
      id: 'tenant-456',
      subdomain: 'blue',
      name: 'Blue',
      settings: {},
      userId: 'user-456',
    });
  });
});
