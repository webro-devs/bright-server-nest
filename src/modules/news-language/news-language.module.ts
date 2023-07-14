import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsLanguage } from './news-language.entity';
import { NewsLanguageService } from './news-language.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsLanguage])],
  providers: [NewsLanguageService],
  exports: [NewsLanguageService],
})
export class NewsLanguageModule {}
