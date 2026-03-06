import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentDefinitionsController } from './content-definitions.controller';
import { ContentDefinitionsService } from './content-definitions.service';
import { ContentDefinition } from './entities/content-definition.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentDefinition])],
  controllers: [ContentDefinitionsController],
  providers: [ContentDefinitionsService],
})
export class ContentDefinitionsModule {}
