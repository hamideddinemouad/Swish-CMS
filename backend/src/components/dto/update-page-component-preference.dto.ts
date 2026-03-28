import { IsObject } from 'class-validator';

export class UpdatePageComponentPreferenceDto {
  @IsObject()
  preference: Record<string, unknown>;
}
