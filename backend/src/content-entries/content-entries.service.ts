import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentEntryDto } from './dto/create-content-entry.dto';
import { UpdateContentEntryDto } from './dto/update-content-entry.dto';
import { ContentEntry } from './entities/content-entry.entity';

@Injectable()
export class ContentEntriesService {
  constructor(
    @InjectRepository(ContentEntry)
    private readonly contentEntriesRepository: Repository<ContentEntry>,
  ) {}

  create(createContentEntryDto: CreateContentEntryDto): Promise<ContentEntry> {
    const contentEntry = this.contentEntriesRepository.create(
      createContentEntryDto,
    );

    return this.contentEntriesRepository.save(contentEntry);
  }

  findAll(): Promise<ContentEntry[]> {
    return this.contentEntriesRepository.find();
  }

  async findOne(id: string): Promise<ContentEntry> {
    const contentEntry = await this.contentEntriesRepository.findOne({
      where: { id },
    });

    if (!contentEntry) {
      throw new NotFoundException(`ContentEntry with id ${id} not found`);
    }

    return contentEntry;
  }

  async update(
    id: string,
    updateContentEntryDto: UpdateContentEntryDto,
  ): Promise<ContentEntry> {
    const contentEntry = await this.findOne(id);

    this.contentEntriesRepository.merge(contentEntry, updateContentEntryDto);

    return this.contentEntriesRepository.save(contentEntry);
  }

  async remove(id: string): Promise<void> {
    const result = await this.contentEntriesRepository.delete(id);

    if (!result.affected) {
      throw new NotFoundException(`ContentEntry with id ${id} not found`);
    }
  }
}
