import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContentEntriesService } from './content-entries.service';
import { CreateContentEntryDto } from './dto/create-content-entry.dto';
import { UpdateContentEntryDto } from './dto/update-content-entry.dto';

@Controller('content-entries')
export class ContentEntriesController {
  constructor(private readonly contentEntriesService: ContentEntriesService) {}

  @Post()
  create(@Body() createContentEntryDto: CreateContentEntryDto) {
    return this.contentEntriesService.create(createContentEntryDto);
  }

  @Get()
  findAll() {
    return this.contentEntriesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentEntriesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContentEntryDto: UpdateContentEntryDto) {
    return this.contentEntriesService.update(id, updateContentEntryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentEntriesService.remove(id);
  }
}
