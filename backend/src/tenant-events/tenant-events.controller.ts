import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TenantEventsService } from './tenant-events.service';
import { CreateTenantEventDto } from './dto/create-tenant-event.dto';
import { UpdateTenantEventDto } from './dto/update-tenant-event.dto';

@Controller('tenant-events')
export class TenantEventsController {
  constructor(private readonly tenantEventsService: TenantEventsService) {}

  @Post()
  create(@Body() createTenantEventDto: CreateTenantEventDto) {
    return this.tenantEventsService.create(createTenantEventDto);
  }

  @Get()
  findAll() {
    return this.tenantEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantEventsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTenantEventDto: UpdateTenantEventDto,
  ) {
    return this.tenantEventsService.update(id, updateTenantEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantEventsService.remove(id);
  }
}
