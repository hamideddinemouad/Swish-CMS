import {
  IsIn,
  IsObject,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';
import { SETUP_TEMPLATE_IDS, type SetupTemplateId } from '../../setup/template-catalog';

export class CreateTenantDto {
  @IsString()
  @MinLength(1)
  @Matches(/^[a-z0-9-]+$/)
  subdomain: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsUUID()
  userId: string;

  @IsObject()
  settings: Record<string, unknown>;

  @IsOptional()
  @IsString()
  @IsIn(SETUP_TEMPLATE_IDS)
  templateId?: SetupTemplateId;
}
