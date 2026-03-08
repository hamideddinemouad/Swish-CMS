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
import { ContentDefinition } from '../../content-definitions/entities/content-definition.entity';
import { Tenant } from '../../tenants/entities/tenant.entity';

@Entity({ name: 'content_entries' })
@Index('idx_content_entries_tenant_def_pub_created', [
  'tenantId',
  'definitionId',
  'isPublished',
  'createdAt',
])
@Index('idx_content_entries_tenant_def_slug', [
  'tenantId',
  'definitionId',
  'slug',
])
@Check(`"slug" ~ '^[a-z0-9-]+$'`)
@Unique('content_entries_unique_per_type', ['tenantId', 'definitionId', 'slug'])
export class ContentEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid' })
  tenantId: string;

  @Column({ name: 'definition_id', type: 'uuid' })
  definitionId: string;

  @Column()
  slug: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb"  })
  data: Record<string, unknown>;

  @Column({ name: 'is_published', default: false })
  isPublished: boolean;

  @Column({
    name: 'published_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  publishedAt: Date;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @ManyToOne(() => Tenant, (tenant) => tenant.contentEntries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'tenant_id' })
  tenant: Tenant;

  @ManyToOne(
    () => ContentDefinition,
    (contentDefinition) => contentDefinition.contentEntries,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'definition_id' })
  definition: ContentDefinition;
}
