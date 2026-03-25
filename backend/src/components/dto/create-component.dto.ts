import { IsObject, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateComponentDto {
  @IsUUID()
  pageId: string;

  @IsString()
  @MinLength(1)
  title: string;

  @IsObject()
  data: Record<string, unknown>;

  @IsObject()
  preference: Record<string, unknown>;
}
