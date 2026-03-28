import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { ComponentsModule } from '../components/components.module';
import { Component } from '../components/entities/component.entity';
import { Page } from './entities/page.entity';
import { PagesController } from './pages.controller';
import { PagesService } from './pages.service';

@Module({
  imports: [
    AuthModule,
    ComponentsModule,
    TypeOrmModule.forFeature([Page, Component]),
  ],
  controllers: [PagesController],
  providers: [PagesService],
})
export class PagesModule {}
