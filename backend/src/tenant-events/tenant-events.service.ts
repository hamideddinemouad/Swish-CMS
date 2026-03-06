import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTenantEventDto } from './dto/create-tenant-event.dto';
import { UpdateTenantEventDto } from './dto/update-tenant-event.dto';
import { TenantEvent } from './entities/tenant-event.entity';

@Injectable()
export class TenantEventsService {
  constructor(
    @InjectRepository(TenantEvent)
    private readonly tenantEventsRepository: Repository<TenantEvent>,
  ) {}

  create(createTenantEventDto: CreateTenantEventDto): Promise<TenantEvent> {
    const tenantEvent = this.tenantEventsRepository.create(createTenantEventDto);
    return this.tenantEventsRepository.save(tenantEvent);
  }

  findAll(): Promise<TenantEvent[]> {
    return this.tenantEventsRepository.find();
  }

  async findOne(id: string): Promise<TenantEvent> {
    const tenantEvent = await this.tenantEventsRepository.findOne({
      where: { id },
    });

    if (!tenantEvent) {
      throw new NotFoundException(`TenantEvent with id ${id} not found`);
    }

    return tenantEvent;
  }

  async update(
    id: string,
    updateTenantEventDto: UpdateTenantEventDto,
  ): Promise<TenantEvent> {
    const tenantEvent = await this.findOne(id);

    this.tenantEventsRepository.merge(tenantEvent, updateTenantEventDto);

    return this.tenantEventsRepository.save(tenantEvent);
  }

  async remove(id: string): Promise<void> {
    const result = await this.tenantEventsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`TenantEvent with id ${id} not found`);
    }
  }
}
