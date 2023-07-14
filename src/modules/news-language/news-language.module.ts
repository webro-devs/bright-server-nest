import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NewsLanguage } from './news-language.entity';
import { NewsLanguageRepository } from './news-language.repository';
import { NewsLanguageService } from './news-language.service';

@Module({
  imports: [TypeOrmModule.forFeature([NewsLanguage])],
  providers: [NewsLanguageService, NewsLanguageRepository],
  exports: [NewsLanguageService, NewsLanguageRepository],
})
export class NewsLanguageModule {}
