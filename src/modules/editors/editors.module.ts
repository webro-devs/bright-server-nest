import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { NewsEditor } from './editors.entity';
import { NewsEditorService } from './editors.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsEditor])],
  providers: [NewsEditorService],
  exports: [NewsEditorService],
})
export class NewsEditorModule {}
