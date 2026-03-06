import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'content_entries' })
@Check(`"slug" ~ '^[a-z0-9-]+$'`)
@Unique('content_entries_unique_per_type', ['tenantId', 'definitionId', 'slug'])
export class ContentEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid', nullable: false })
  tenantId: string;

  @Column({ name: 'definition_id', type: 'uuid', nullable: false })
  definitionId: string;

  @Column({ type: 'text', nullable: false })
  slug: string;

  @Column({ type: 'jsonb', nullable: false })
  data: Record<string, unknown>;

  @Column({ name: 'is_published', type: 'boolean', nullable: false, default: false })
  isPublished: boolean;

  @Column({
    name: 'published_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  publishedAt: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
