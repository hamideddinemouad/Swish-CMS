import {
  IsBoolean,
  IsDateString,
  IsObject,
  IsString,
  IsUUID,
  Matches,
  MinLength,
} from 'class-validator';

export class CreateContentEntryDto {
  @IsUUID()
  tenantId: string;

  @IsUUID()
  definitionId: string;

  @IsString()
  @MinLength(1)
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsObject()
  data: Record<string, unknown>;

  @IsBoolean()
  isPublished: boolean;

  @IsDateString()
  publishedAt: Date;
}
