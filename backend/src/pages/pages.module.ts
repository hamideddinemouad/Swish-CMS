import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Component } from '../components/entities/component.entity';
import { Page } from './entities/page.entity';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Component])],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
