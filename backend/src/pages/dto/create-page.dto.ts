import { IsObject, IsString, IsUUID, Matches, MinLength } from 'class-validator';

export class CreatePageDto {
  @IsUUID()
  tenantId: string;

  @IsString()
  @MinLength(4)
  @Matches(/^[a-z0-9-]+$/)
  slug: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsObject()
  components: {type : string, enabled : boolean}[];
}
