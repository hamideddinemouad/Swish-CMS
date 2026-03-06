import { PartialType } from '@nestjs/mapped-types';
import { CreateContentDefinitionDto } from './create-content-definition.dto';

export class UpdateContentDefinitionDto extends PartialType(
  CreateContentDefinitionDto,
) {}
