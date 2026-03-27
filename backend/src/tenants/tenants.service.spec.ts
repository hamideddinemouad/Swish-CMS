import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Tenant } from './entities/tenant.entity';
import { TenantsService } from './tenants.service';
import { SetupService } from '../setup/setup.service';

describe('TenantsService', () => {
  let service: TenantsService;
  const tenantsRepository = {
    exists: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
  };
  const setupService = {
    setup: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: TenantsService,
          useValue: new TenantsService(tenantsRepository as never, setupService as never),
        },
        {
          provide: getRepositoryToken(Tenant),
          useValue: tenantsRepository,
        },
        {
          provide: SetupService,
          useValue: setupService,
        },
      ],
    }).compile();

    service = module.get<TenantsService>(TenantsService);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('saves the tenant and seeds default pages', async () => {
    tenantsRepository.exists.mockResolvedValue(false);
    tenantsRepository.create.mockReturnValue({
      id: 'tenant-123',
      subdomain: 'acme',
      name: 'Acme',
      settings: {},
      userId: 'user-123',
    });
    tenantsRepository.save.mockResolvedValue({
      id: 'tenant-123',
      subdomain: 'acme',
      name: 'Acme',
      settings: {},
      userId: 'user-123',
    });
    setupService.setup.mockResolvedValue({ status: 'ok' });

    const result = await service.create({
      subdomain: 'acme',
      name: 'Acme',
      userId: 'user-123',
      settings: {},
    });

    expect(tenantsRepository.save).toHaveBeenCalledWith({
      id: 'tenant-123',
      subdomain: 'acme',
      name: 'Acme',
      settings: {},
      userId: 'user-123',
    });
    expect(setupService.setup).toHaveBeenCalledWith('tenant-123');
    expect(result).toEqual({
      id: 'tenant-123',
      subdomain: 'acme',
      name: 'Acme',
      settings: {},
      userId: 'user-123',
    });
  });

  it('still returns the tenant when setup reports an error', async () => {
    tenantsRepository.exists.mockResolvedValue(false);
    tenantsRepository.create.mockReturnValue({
      id: 'tenant-456',
      subdomain: 'blue',
      name: 'Blue',
      settings: {},
      userId: 'user-456',
    });
    tenantsRepository.save.mockResolvedValue({
      id: 'tenant-456',
      subdomain: 'blue',
      name: 'Blue',
      settings: {},
      userId: 'user-456',
    });
    setupService.setup.mockResolvedValue({
      status: 'error',
      message: 'boom',
    });

    const result = await service.create({
      subdomain: 'blue',
      name: 'Blue',
      userId: 'user-456',
      settings: {},
    });

    expect(setupService.setup).toHaveBeenCalledWith('tenant-456');
    expect(result).toEqual({
      id: 'tenant-456',
      subdomain: 'blue',
      name: 'Blue',
      settings: {},
      userId: 'user-456',
    });
  });
});
