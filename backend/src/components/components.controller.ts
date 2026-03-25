import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateComponentDto } from './dto/create-component.dto';
import { UpdateComponentDto } from './dto/update-component.dto';
import { ComponentsService } from './components.service';

@Controller('components')
export class ComponentsController {
  constructor(private readonly componentsService: ComponentsService) {}

  @Post()
  create(@Body() createComponentDto: CreateComponentDto) {
    return this.componentsService.create(createComponentDto);
  }

  @Get()
  findAll() {
    return this.componentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.componentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComponentDto: UpdateComponentDto) {
    return this.componentsService.update(id, updateComponentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.componentsService.remove(id);
  }
}
