import { IsObject } from 'class-validator';

export class UpdatePageComponentContentDto {
  @IsObject()
  data: Record<string, unknown>;
}
