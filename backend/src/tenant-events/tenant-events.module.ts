import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantEventsController } from './tenant-events.controller';
import { TenantEventsService } from './tenant-events.service';
import { TenantEvent } from './entities/tenant-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TenantEvent])],
  controllers: [TenantEventsController],
  providers: [TenantEventsService],
})
export class TenantEventsModule {}
