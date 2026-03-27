import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SetupController } from './setup.controller';
import { SetupService } from './setup.service';
import { Component } from '../components/entities/component.entity';
import { Page } from '../pages/entities/page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page, Component])],
  controllers: [SetupController],
  providers: [SetupService],
  exports: [SetupService],
})
export class SetupModule {}
