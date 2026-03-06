import { MembershipRole } from '../entities/membership.entity';

export class CreateMembershipDto {
  userId: string;
  tenantId: string;
  role: MembershipRole;
}
