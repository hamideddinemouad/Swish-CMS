import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentDefinitionDto } from './dto/create-content-definition.dto';
import { UpdateContentDefinitionDto } from './dto/update-content-definition.dto';
import { ContentDefinition } from './entities/content-definition.entity';

@Injectable()
export class ContentDefinitionsService {
  constructor(
    @InjectRepository(ContentDefinition)
    private readonly contentDefinitionsRepository: Repository<ContentDefinition>,
  ) {}

  create(
    createContentDefinitionDto: CreateContentDefinitionDto,
  ): Promise<ContentDefinition> {
    const contentDefinition = this.contentDefinitionsRepository.create(
      createContentDefinitionDto,
    );

    return this.contentDefinitionsRepository.save(contentDefinition);
  }

  findAll(): Promise<ContentDefinition[]> {
    return this.contentDefinitionsRepository.find();
  }

  async findOne(id: string): Promise<ContentDefinition> {
    const contentDefinition = await this.contentDefinitionsRepository.findOne({
      where: { id },
    });

    if (!contentDefinition) {
      throw new NotFoundException(
        `ContentDefinition with id ${id} not found`,
      );
    }

    return contentDefinition;
  }

  async update(
    id: string,
    updateContentDefinitionDto: UpdateContentDefinitionDto,
  ): Promise<ContentDefinition> {
    const contentDefinition = await this.findOne(id);

    this.contentDefinitionsRepository.merge(
      contentDefinition,
      updateContentDefinitionDto,
    );

    return this.contentDefinitionsRepository.save(contentDefinition);
  }

  async remove(id: string): Promise<void> {
    const result = await this.contentDefinitionsRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(
        `ContentDefinition with id ${id} not found`,
      );
    }
  }
}
