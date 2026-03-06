import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContentEntriesController } from './content-entries.controller';
import { ContentEntriesService } from './content-entries.service';
import { ContentEntry } from './entities/content-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContentEntry])],
  controllers: [ContentEntriesController],
  providers: [ContentEntriesService],
})
export class ContentEntriesModule {}
