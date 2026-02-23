import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'tenants' })
@Check(`"subdomain" ~ '^[a-z0-9-]+$'`)
@Check(
  `"subdomain" NOT IN ('www','app','api','admin','static','assets','cdn','mail')`,
)
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', unique: true, nullable: false })
  subdomain: string;

  @Column({ type: 'text', nullable: false })
  name: string;

  @Column({ type: 'jsonb', nullable: false, default: () => "'{}'::jsonb" })
  settings: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;
}
