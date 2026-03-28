import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Component } from '../components/entities/component.entity';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

export type PageComponentDetails = Pick<
  Component,
  'id' | 'title' | 'data' | 'preference'
>;

export type PageWithComponentDetails = Page & {
  componentDetails: PageComponentDetails[];
};

@Injectable()
export class PagesService {
  constructor(
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
    @InjectRepository(Component)
    private readonly componentsRepository: Repository<Component>,
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
  ): Promise<PageWithComponentDetails> {
    const normalizedSubdomain = subdomain.trim().toLowerCase();
    const normalizedPageName = pageName.trim().toLowerCase();

    const page = await this.pagesRepository.findOne({
      where: {
        slug: normalizedPageName,
        tenant: {
          subdomain: normalizedSubdomain,
        },
      },
    });

    if (!page) {
      throw new NotFoundException(
        `Page ${normalizedPageName} for tenant ${normalizedSubdomain} not found`,
      );
    }

    const componentDetails = await this.componentsRepository.find({
      where: {
        pageId: page.id,
      },
      select: {
        id: true,
        title: true,
        data: true,
        preference: true,
      },
    });

    return {
      ...page,
      componentDetails,
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
