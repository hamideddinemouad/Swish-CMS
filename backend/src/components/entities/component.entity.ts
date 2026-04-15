import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Page } from '../../pages/entities/page.entity';

@Entity({ name: 'components' })
@Unique('UQ_components_page_id', ['pageId'])
export class Component {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'page_id', type: 'uuid' })
  pageId: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  data: Record<string, unknown>;

  @Column({ type: 'jsonb', default: () => "'{}'::jsonb" })
  preference: Record<string, unknown>;

  @ManyToOne(() => Page, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'page_id' })
  page: Page;
}
