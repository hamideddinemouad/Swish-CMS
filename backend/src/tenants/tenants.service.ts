import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Tenant } from './entities/tenant.entity';

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

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantsRepository: Repository<Tenant>,
  ) {}

  create(createTenantDto: CreateTenantDto) {
    return 'This action adds a new tenant';
  }

  findAll() {
    return `This action returns all tenants`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  async checkAvailability(subdomain: string): Promise<{ available: boolean }> {
    if (!SUBDOMAIN_REGEX.test(subdomain) || RESERVED_SUBDOMAINS.has(subdomain)) {
      return { available: false };
    }

    const tenantExists = await this.tenantsRepository.exists({
      where: { subdomain },
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
