import {
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  MinLength,
  ValidateIf,
} from 'class-validator';

export class CreateTenantEventDto {
  @IsUUID()
  tenantId: string;

  @IsOptional()
  @ValidateIf((_, value) => value !== null)
  @IsUUID()
  actorUserId: string | null;

  @IsString()
  @MinLength(1)
  type: string;

  @IsObject()
  payload: Record<string, unknown>;
}
