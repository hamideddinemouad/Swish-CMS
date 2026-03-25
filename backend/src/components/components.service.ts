import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { Component } from './entities/component.entity';

@Injectable()
export class ComponentsService {
  constructor(
    @InjectRepository(Component)
    private readonly componentsRepository: Repository<Component>,
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

  async remove(id: string): Promise<void> {
    const result = await this.componentsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`Component with id ${id} not found`);
    }
  }
}
