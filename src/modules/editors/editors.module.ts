import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsEditor } from './editors.entity';
import { NewsEditorRepository } from './editors.repository';
import { NewsEditorService } from './editors.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEditor])],
  providers: [NewsEditorService, NewsEditorRepository],
  exports: [NewsEditorService, NewsEditorRepository],
})
export class NewsEditorModule {}
