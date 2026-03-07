import { IsObject, IsString, Matches, MinLength } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  @MinLength(1)
  @Matches(/^[a-z0-9-]+$/)
  subdomain: string;

  @IsString()
  @MinLength(1)
  name: string;

  @IsObject()
  settings: Record<string, unknown>;
}
