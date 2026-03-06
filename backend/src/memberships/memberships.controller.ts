import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MembershipsService } from './memberships.service';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';

@Controller('memberships')
export class MembershipsController {
  constructor(private readonly membershipsService: MembershipsService) {}

  @Post()
  create(@Body() createMembershipDto: CreateMembershipDto) {
    return this.membershipsService.create(createMembershipDto);
  }

  @Get()
  findAll() {
    return this.membershipsService.findAll();
  }

  @Get(':userId/:tenantId')
  findOne(
    @Param('userId') userId: string,
    @Param('tenantId') tenantId: string,
  ) {
    return this.membershipsService.findOne(userId, tenantId);
  }

  @Patch(':userId/:tenantId')
  update(
    @Param('userId') userId: string,
    @Param('tenantId') tenantId: string,
    @Body() updateMembershipDto: UpdateMembershipDto,
  ) {
    return this.membershipsService.update(
      userId,
      tenantId,
      updateMembershipDto,
    );
  }

  @Delete(':userId/:tenantId')
  remove(
    @Param('userId') userId: string,
    @Param('tenantId') tenantId: string,
  ) {
    return this.membershipsService.remove(userId, tenantId);
  }
}
