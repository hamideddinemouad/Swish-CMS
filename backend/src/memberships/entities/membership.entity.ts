import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  Unique,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Tenant, (tenant) => tenant.memberships, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
