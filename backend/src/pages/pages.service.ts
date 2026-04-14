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

export type AvailablePagePayload = Pick<Page, 'slug' | 'title'>;

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

  findByTenant(tenantId: string): Promise<Page[]> {
    return this.pagesRepository.find({
      where: { tenantId },
    });
  }

  async findBySubdomain(subdomain: string): Promise<AvailablePagePayload[]> {
    const rows = await this.pagesRepository.query(
      `
        SELECT
          p.slug,
          p.title
        FROM pages p
        INNER JOIN tenants t ON t.id = p.tenant_id
        WHERE t.subdomain = $1
        ORDER BY p.created_at ASC
      `,
      [subdomain],
    );

    return rows as AvailablePagePayload[];
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

  async disableComponent(
    tenantId: string,
    pageName: string,
    componentType: string,
  ): Promise<Page> {
    const page = await this.pagesRepository.findOne({
      where: {
        tenantId,
        slug: pageName,
      },
    });

    if (!page) {
      throw new NotFoundException(
        `Page ${pageName} not found for tenant ${tenantId}`,
      );
    }

    const components = Array.isArray(page.components) ? [...page.components] : [];

    const componentIndex = components.findIndex((component) => {
      if (!isComponentDefinition(component)) {
        return false;
      }

      return component.type === componentType;
    });

    if (componentIndex === -1) {
      throw new NotFoundException(
        `Component ${componentType} not found on page ${pageName}`,
      );
    }

    const component = components[componentIndex] as Record<string, unknown>;
    components[componentIndex] = {
      ...component,
      enabled: false,
    };

    page.components = components;

    return this.pagesRepository.save(page);
  }

  async removeComponent(
    tenantId: string,
    pageName: string,
    componentType: string,
  ): Promise<Page> {
    const page = await this.pagesRepository.findOne({
      where: {
        tenantId,
        slug: pageName,
      },
    });

    if (!page) {
      throw new NotFoundException(
        `Page ${pageName} not found for tenant ${tenantId}`,
      );
    }

    const components = Array.isArray(page.components) ? [...page.components] : [];
    const nextComponents = components.filter((component) => {
      if (!isComponentDefinition(component)) {
        return true;
      }

      return component.type !== componentType;
    });

    if (nextComponents.length === components.length) {
      throw new NotFoundException(
        `Component ${componentType} not found on page ${pageName}`,
      );
    }

    page.components = nextComponents;

    return this.pagesRepository.save(page);
  }

  async removeByTenantAndPageName(
    tenantId: string,
    pageName: string,
  ): Promise<void> {
    const result = await this.pagesRepository.delete({
      tenantId,
      slug: pageName,
    });

    if (!result.affected) {
      throw new NotFoundException(
        `Page ${pageName} not found for tenant ${tenantId}`,
      );
    }
  }

  async remove(id: string): Promise<void> {
    const result = await this.pagesRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Page with id ${id} not found`);
    }
  }
}

function isComponentDefinition(
  value: unknown,
): value is Record<string, unknown> & { type: string } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof value.type === 'string'
  );
}
