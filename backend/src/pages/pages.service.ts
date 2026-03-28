import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

export type PageWithComponentPayload = {
  slug: string;
  components: Page['components'];
  data: Record<string, unknown>;
  preference: Record<string, unknown>;
};

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
  ) {}

  create(createPageDto: CreatePageDto): Promise<Page> {
    const page = this.pagesRepository.create(createPageDto);
    return this.pagesRepository.save(page);
  }

  findAll(): Promise<Page[]> {
    return this.pagesRepository.find();
  }

  async findOne(id: string): Promise<Page> {
    const page = await this.pagesRepository.findOne({ where: { id } });

    if (!page) {
      throw new NotFoundException(`Page with id ${id} not found`);
    }

    return page;
  }

  async findBySubdomainAndPageName(
    subdomain: string,
    pageName: string,
  ): Promise<PageWithComponentPayload> {
    const rows = await this.pagesRepository.query(
      `
        SELECT
          p.slug AS slug,
          p.components AS components,
          c.data AS data,
          c.preference AS preference
        FROM pages p
        INNER JOIN tenants t ON t.id = p.tenant_id
        INNER JOIN components c ON c.page_id = p.id
        WHERE t.subdomain = $1
          AND p.slug = $2
        LIMIT 1
      `,
      [subdomain, pageName],
    );

    if (!rows.length) {
      throw new NotFoundException(`Page ${pageName} for tenant ${subdomain} not found`);
    }

    const page = rows[0] as PageWithComponentPayload;

    return {
      slug: page.slug,
      components: page.components,
      data: page.data,
      preference: page.preference,
    };
  }

  async update(id: string, updatePageDto: UpdatePageDto): Promise<Page> {
    const page = await this.findOne(id);

    this.pagesRepository.merge(page, updatePageDto);

    return this.pagesRepository.save(page);
  }

  async remove(id: string): Promise<void> {
    const result = await this.pagesRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Page with id ${id} not found`);
    }
  }
}
