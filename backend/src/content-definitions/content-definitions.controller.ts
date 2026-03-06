import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ContentDefinitionsService } from './content-definitions.service';
import { CreateContentDefinitionDto } from './dto/create-content-definition.dto';
import { UpdateContentDefinitionDto } from './dto/update-content-definition.dto';

@Controller('content-definitions')
export class ContentDefinitionsController {
  constructor(
    private readonly contentDefinitionsService: ContentDefinitionsService,
  ) {}

  @Post()
  create(@Body() createContentDefinitionDto: CreateContentDefinitionDto) {
    return this.contentDefinitionsService.create(createContentDefinitionDto);
  }

  @Get()
  findAll() {
    return this.contentDefinitionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contentDefinitionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContentDefinitionDto: UpdateContentDefinitionDto,
  ) {
    return this.contentDefinitionsService.update(id, updateContentDefinitionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contentDefinitionsService.remove(id);
  }
}
