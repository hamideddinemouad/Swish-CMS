import { IsObject, IsString, IsUUID, Matches, MinLength } from 'class-validator';

export class CreateContentDefinitionDto {
  @IsUUID()
  tenantId: string;

  @IsString()
  @MinLength(1)
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsObject()
  schema: Record<string, unknown>;
}
