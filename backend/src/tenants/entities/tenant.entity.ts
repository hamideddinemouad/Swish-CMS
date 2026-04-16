import {
  Check,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Page } from '../../pages/entities/page.entity';
import { User } from '../../users/entities/user.entity';

@Entity({ name: 'tenants' })
@Check(`"subdomain" ~ '^[a-z0-9-]+$'`)
@Check(
  `"subdomain" NOT IN ('www','app','api','admin','static','assets','cdn','mail','swish','root','support','help','docs','status','login','auth','signup','register','dashboard','portal','account','accounts','billing','payments','checkout','secure','webmail','ftp','smtp','imap','pop','mx','dns','ns1','ns2','dev','test','staging','stage','prod','production','beta','preview','demo','internal','console','manage','management','system','core','proxy','gateway','edge','origin','cache','monitor','metrics','logs','telemetry','analytics','images','media','files','uploads','storage','db','database')`,
)
export class Tenant {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true })
  subdomain: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  settings: Record<string, unknown>;

  @Column({ name: 'user_id', type: 'uuid', nullable: true, unique: true })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
  updatedAt: Date;

  @OneToMany(() => Page, (page) => page.tenant)
  pages: Page[];

  @OneToOne(() => User, (user) => user.tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
