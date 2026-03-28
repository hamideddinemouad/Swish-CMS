import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from '../pages/entities/page.entity';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdatePageComponentContentDto } from './dto/update-page-component-content.dto';
import { UpdatePageComponentPreferenceDto } from './dto/update-page-component-preference.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private readonly componentsRepository: Repository<Component>,
    @InjectRepository(Page)
    private readonly pagesRepository: Repository<Page>,
  ) {}

  create(createComponentDto: CreateComponentDto): Promise<Component> {
    const component = this.componentsRepository.create(createComponentDto);

    return this.componentsRepository.save(component);
  }

  findAll(): Promise<Component[]> {
    return this.componentsRepository.find();
  }

  async findOne(id: string): Promise<Component> {
    const component = await this.componentsRepository.findOne({
      where: { id },
    });

    if (!component) {
      throw new NotFoundException(`Component with id ${id} not found`);
    }

    return component;
  }

  async update(
    id: string,
    updateComponentDto: UpdateComponentDto,
  ): Promise<Component> {
    const component = await this.findOne(id);

    this.componentsRepository.merge(component, updateComponentDto);

    return this.componentsRepository.save(component);
  }

  async updatePageContent(
    tenantId: string,
    pageName: string,
    updatePageComponentContentDto: UpdatePageComponentContentDto,
  ): Promise<Component> {
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

    const component = await this.componentsRepository.findOne({
      where: {
        pageId: page.id,
      },
    });

    if (!component) {
      throw new NotFoundException(`Component for page ${pageName} not found`);
    }

    component.data = updatePageComponentContentDto.data;

    return this.componentsRepository.save(component);
  }

  async updatePagePreference(
    tenantId: string,
    pageName: string,
    updatePageComponentPreferenceDto: UpdatePageComponentPreferenceDto,
  ): Promise<Component> {
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

    const component = await this.componentsRepository.findOne({
      where: {
        pageId: page.id,
      },
    });

    if (!component) {
      throw new NotFoundException(`Component for page ${pageName} not found`);
    }

    component.preference = updatePageComponentPreferenceDto.preference;

    return this.componentsRepository.save(component);
  }

  async remove(id: string): Promise<void> {
    const result = await this.componentsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Component with id ${id} not found`);
    }
  }
}
