import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tenant_events' })
@Index('idx_tenant_events_tenant_created', ['tenantId', 'createdAt'])
export class TenantEvent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column({ name: 'actor_user_id', type: 'uuid', nullable: true })
  actorUserId: string | null;

  @Column()
  type: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  payload: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.tenantEvents, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(() => User, (user) => user.tenantEvents, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  @JoinColumn({ name: 'actor_user_id' })
  actorUser: User | null;
}
