import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from '../components/entities/component.entity';
import { Page } from '../pages/entities/page.entity';
import {
  DEFAULT_SETUP_TEMPLATE_ID,
  type SetupTemplateId,
} from './template-catalog';
import { getTemplateSeeds } from './templates';

type SeededPage = {
  id: string;
  slug: string;
};

@Injectable()
export class SetupService {
  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Component)
    private readonly componentsRepository: Repository<Component>,
  ) {}

  async setup(tenantId: string, templateId: SetupTemplateId = DEFAULT_SETUP_TEMPLATE_ID) {
    try {
      const pages = await this.seedPages(tenantId, templateId);
      const components = await this.seedComponents(pages, templateId);

      return {
        status: 'ok',
        tenantId,
        templateId,
        pagesCreated: pages.length,
        componentsCreated: components.length,
      };
    } catch (error) {
      return {
        status: 'error',
        message:
          error instanceof Error
            ? error.message
            : 'Default page setup failed.',
      };
    }
  }

  private async seedPages(
    tenantId: string,
    templateId: SetupTemplateId,
  ): Promise<SeededPage[]> {
    const templateSeeds = getTemplateSeeds(templateId);

    const pageEntities = templateSeeds.map((definition) =>
      this.pagesRepository.create({
        tenantId,
        slug: definition.slug,
        title: definition.title,
        components: definition.page.components,
      }),
    );

    return this.pagesRepository.save(pageEntities);
  }

  private async seedComponents(pages: SeededPage[], templateId: SetupTemplateId) {
    const pagesBySlug = new Map(pages.map((page) => [page.slug, page]));
    const templateSeeds = getTemplateSeeds(templateId);

    const components = templateSeeds.map((definition) => {
      const page = pagesBySlug.get(definition.slug);

      if (!page?.id) {
        throw new Error(`Seeded page not found for slug ${definition.slug}.`);
      }

      return this.componentsRepository.create({
        pageId: page.id,
        title: definition.title,
        data: definition.data,
        preference: definition.preference,
      });
    });

    await this.componentsRepository.save(components);

    return components;
  }
}
