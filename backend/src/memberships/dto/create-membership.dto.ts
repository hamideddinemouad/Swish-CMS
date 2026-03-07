import { MembershipRole } from '../entities/membership.entity';
import { IsEnum, IsUUID } from 'class-validator';

export class CreateMembershipDto {
  @IsUUID()
  userId: string;

  @IsUUID()
  tenantId: string;

  @IsEnum(MembershipRole)
  role: MembershipRole;
}
