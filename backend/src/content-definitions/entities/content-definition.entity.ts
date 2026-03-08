import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';
import { ContentEntry } from '../../content-entries/entities/content-entry.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'content_definitions' })
@Index('idx_content_definitions_tenant_slug', ['tenantId', 'slug'])
@Check(`"slug" ~ '^[a-z0-9-]+$'`)
@Unique('content_definitions_unique_per_tenant', ['tenantId', 'slug'])
export class ContentDefinition {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column()
  slug: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb' })
  schema: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.contentDefinitions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @OneToMany(() => ContentEntry, (contentEntry) => contentEntry.definition)
  contentEntries: ContentEntry[];
}
