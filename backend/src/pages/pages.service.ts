import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';
import { Page } from './entities/page.entity';

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
