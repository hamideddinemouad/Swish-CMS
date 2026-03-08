import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ContentDefinition } from '../../content-definitions/entities/content-definition.entity';
import { ContentEntry } from '../../content-entries/entities/content-entry.entity';
import { Membership } from '../../memberships/entities/membership.entity';
import { Page } from '../../pages/entities/page.entity';
import { TenantEvent } from '../../tenant-events/entities/tenant-event.entity';

@Entity({ name: 'tenants' })
@Check(`"subdomain" ~ '^[a-z0-9-]+$'`)
@Check(
  `"subdomain" NOT IN ('www','app','api','admin','static','assets','cdn','mail')`,
)
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  subdomain: string;

  @Column()
  name: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  settings: Record<string, unknown>;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => Membership, (membership) => membership.tenant)
  memberships: Membership[];

  @OneToMany(() => ContentDefinition, (contentDefinition) => contentDefinition.tenant)
  contentDefinitions: ContentDefinition[];

  @OneToMany(() => ContentEntry, (contentEntry) => contentEntry.tenant)
  contentEntries: ContentEntry[];

  @OneToMany(() => Page, (page) => page.tenant)
  pages: Page[];

  @OneToMany(() => TenantEvent, (tenantEvent) => tenantEvent.tenant)
  tenantEvents: TenantEvent[];
}
