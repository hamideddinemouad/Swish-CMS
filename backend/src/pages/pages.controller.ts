import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ComponentsService } from '../components/components.service';
import { UpdatePageComponentContentDto } from '../components/dto/update-page-component-content.dto';
import { UpdatePageComponentPreferenceDto } from '../components/dto/update-page-component-preference.dto';
import { SetAccessPayload } from '../auth/decorators/access.payload.decorator';
import type { AccessPayload } from '../auth/decorators/access.payload.decorator';
import { AccessGuard } from '../auth/guards/access.guard';
import { PagesService } from './pages.service';
import { CreatePageDto } from './dto/create-page.dto';
import { UpdatePageDto } from './dto/update-page.dto';

@Controller('pages')
export class PagesController {
  constructor(
    private readonly pagesService: PagesService,
    private readonly componentsService: ComponentsService,
  ) {}

  @Post()
  create(@Body() createPageDto: CreatePageDto) {
    return this.pagesService.create(createPageDto);
  }

  @Get()
  findAll() {
    return this.pagesService.findAll();
  }

  @Get('by-tenant')
  @UseGuards(AccessGuard)
  findByTenant(@SetAccessPayload() accessPayload: AccessPayload) {
    return this.pagesService.findByTenant(accessPayload.tenantId);
  }

  @Get('by-subdomain')
  findBySubdomain(@Query('subdomain') subdomain?: string) {
    const normalizedSubdomain = subdomain?.trim().toLowerCase();

    if (!normalizedSubdomain) {
      throw new BadRequestException('subdomain query parameter is required');
    }

    return this.pagesService.findBySubdomain(normalizedSubdomain);
  }

  @Get(':subdomain/:pageName')
  getBySubdomainAndPageName(
    @Param('subdomain') subdomain: string,
    @Param('pageName') pageName: string,
  ) {
    return this.pagesService.findBySubdomainAndPageName(subdomain, pageName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePageDto: UpdatePageDto) {
    return this.pagesService.update(id, updatePageDto);
  }

  @Patch(':pageName/component/content')
  @UseGuards(AccessGuard)
  updateComponentContent(
    @Param('pageName') pageName: string,
    @Body() updatePageComponentContentDto: UpdatePageComponentContentDto,
    @SetAccessPayload() accessPayload: AccessPayload,
  ) {
    return this.componentsService.updatePageContent(
      accessPayload.tenantId,
      pageName,
      updatePageComponentContentDto,
    );
  }
  
  @Patch(':pageName/component/preference')
  @UseGuards(AccessGuard)
  updateComponentPreference(
    @Param('pageName') pageName: string,
    @Body() updatePageComponentPreferenceDto: UpdatePageComponentPreferenceDto,
    @SetAccessPayload() accessPayload: AccessPayload,
  ) {
    return this.componentsService.updatePagePreference(
      accessPayload.tenantId,
      pageName,
      updatePageComponentPreferenceDto,
    );
  }

  @Patch(':pageName/components/:componentType/disable')
  @UseGuards(AccessGuard)
  disableComponent(
    @Param('pageName') pageName: string,
    @Param('componentType') componentType: string,
    @SetAccessPayload() accessPayload: AccessPayload,
  ) {
    return this.pagesService.disableComponent(
      accessPayload.tenantId,
      pageName,
      componentType,
    );
  }

  @Delete('by-name/:pageName')
  @UseGuards(AccessGuard)
  removeByPageName(
    @Param('pageName') pageName: string,
    @SetAccessPayload() accessPayload: AccessPayload,
  ) {
    return this.pagesService.removeByTenantAndPageName(
      accessPayload.tenantId,
      pageName,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagesService.remove(id);
  }
}
