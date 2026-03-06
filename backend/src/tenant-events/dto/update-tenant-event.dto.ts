import { PartialType } from '@nestjs/mapped-types';
import { CreateTenantEventDto } from './create-tenant-event.dto';

export class UpdateTenantEventDto extends PartialType(CreateTenantEventDto) {}
