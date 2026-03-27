import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';
import { SetupService } from '../setup/setup.service';

const SUBDOMAIN_REGEX = /^[a-z0-9-]+$/;
const RESERVED_SUBDOMAINS = new Set([
  'www',
  'app',
  'api',
  'admin',
  'static',
  'assets',
  'cdn',
  'mail',
]);

function normalizeSubdomain(value: string) {
  return value.trim().toLowerCase();
}

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
    private readonly setupService: SetupService,
  ) {}

  async create(createTenantDto: CreateTenantDto) {
    const subdomain = normalizeSubdomain(createTenantDto.subdomain);
    const name = createTenantDto.name.trim();

    if (!name) {
      throw new BadRequestException('Tenant name is required.');
    }

    const availability = await this.checkAvailability(subdomain);
    if (!availability.available) {
      throw new ConflictException('Subdomain is already taken.');
    }

    const userHasTenant = await this.tenantsRepository.exists({
      where: { userId: createTenantDto.userId },
    });

    if (userHasTenant) {
      throw new ConflictException('This user already has a tenant.');
    }

    const tenant = this.tenantsRepository.create({
      subdomain,
      name,
      settings: createTenantDto.settings ?? {},
      userId: createTenantDto.userId,
    });

    const savedTenant = await this.tenantsRepository.save(tenant);
    await this.setupService.setup(savedTenant.id);

    return savedTenant;
  }

  findAll() {
    return `This action returns all tenants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  async checkAvailability(subdomain: string): Promise<{ available: boolean }> {
    const normalizedSubdomain = normalizeSubdomain(subdomain);

    if (
      !SUBDOMAIN_REGEX.test(normalizedSubdomain) ||
      RESERVED_SUBDOMAINS.has(normalizedSubdomain)
    ) {
      return { available: false };
    }

    const tenantExists = await this.tenantsRepository.exists({
      where: { subdomain: normalizedSubdomain },
    });

    return { available: !tenantExists };
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
