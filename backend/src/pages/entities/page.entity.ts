import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'pages' })
@Check(`"slug" ~ '^[a-z0-9-]+$'`)
@Unique('pages_unique_per_tenant', ['tenantId', 'slug'])
export class Page {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'tenant_id', type: 'uuid', nullable: false })
  tenantId: string;

  @Column({ type: 'text', nullable: false })
  slug: string;

  @Column({ type: 'text', nullable: false, default: '' })
  title: string;

  @Column({ type: 'jsonb', nullable: false })
  components: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
