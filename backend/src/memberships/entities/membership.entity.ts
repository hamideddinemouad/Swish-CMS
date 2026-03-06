import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
} from 'typeorm';

export enum MembershipRole {
  OWNER = 'OWNER',
  EDITOR = 'EDITOR',
}

@Entity({ name: 'memberships' })
@Unique('memberships_unique', ['userId', 'tenantId'])
export class Membership {
  @PrimaryColumn({ name: 'user_id', type: 'uuid' })
  userId: string;

  @PrimaryColumn({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column({
    type: 'enum',
    enum: MembershipRole,
  })
  role: MembershipRole;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;
}
