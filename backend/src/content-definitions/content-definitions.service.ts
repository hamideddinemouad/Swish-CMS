import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { CreateContentDefinitionDto } from './dto/create-content-definition.dto';
import { UpdateContentDefinitionDto } from './dto/update-content-definition.dto';
import { ContentDefinition } from './entities/content-definition.entity';
import dataSource from 'src/data-source';

@Injectable()
export class ContentDefinitionsService {
  constructor(
    @InjectRepository(ContentDefinition)
    private readonly contentDefinitionsRepository: Repository<ContentDefinition>,
    private readonly dataSource : DataSource,
    private readonly entityManger : EntityManager
  ) {}

  create(
    createContentDefinitionDto: CreateContentDefinitionDto,
  ): Promise<ContentDefinition> {
    const contentDefinition = this.contentDefinitionsRepository.create(
      createContentDefinitionDto,
    );

    return this.contentDefinitionsRepository.save(contentDefinition);
  }

  async findAll(): Promise<ContentDefinition[]> {
    return await this.dataSource.transaction(async (manager) => {
      const demo = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
      await manager.query(`SET LOCAL app.tenant_id = '${demo}'`);
      return await manager.find(ContentDefinition);
    })
    // return this.contentDefinitionsRepository.find();
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

