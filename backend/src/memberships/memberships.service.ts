import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipsRepository: Repository<Membership>,
  ) {}

  create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const membership =
      this.membershipsRepository.create(createMembershipDto);

    return this.membershipsRepository.save(membership);
  }

  findAll(): Promise<Membership[]> {
    return this.membershipsRepository.find();
  }

  async findOne(userId: string, tenantId: string): Promise<Membership> {
    const membership = await this.membershipsRepository.findOne({
      where: { userId, tenantId },
    });

    if (!membership) {
      throw new NotFoundException(
        `Membership with userId ${userId} and tenantId ${tenantId} not found`,
      );
    }

    return membership;
  }

  async update(
    userId: string,
    tenantId: string,
    updateMembershipDto: UpdateMembershipDto,
  ): Promise<Membership> {
    const membership = await this.findOne(userId, tenantId);

    this.membershipsRepository.merge(membership, updateMembershipDto);

    return this.membershipsRepository.save(membership);
  }

  async remove(userId: string, tenantId: string): Promise<void> {
    const result = await this.membershipsRepository.delete({
      userId,
      tenantId,
    });

    if (!result.affected) {
      throw new NotFoundException(
        `Membership with userId ${userId} and tenantId ${tenantId} not found`,
      );
    }
  }
}
