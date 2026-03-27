import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'pages' })
@Index('idx_pages_tenant_slug', ['tenantId', 'slug'])
@Check(`"slug" ~ '^[a-z0-9-]+$'`)
@Unique('pages_unique_per_tenant', ['tenantId', 'slug'])
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column()
  slug: string;

  @Column()
  title: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb"  })
  components: Record<string, unknown>[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.pages, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;
}
