import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { News } from './news.entity';
import { NewsRepository } from './news.repository';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { NewsLanguageModule } from '../news-language/news-language.module';
import { AdminModule } from '../admin/admin.module';
import { CategoryModule } from '../category/category.module';
import { NewsQueryParserMiddleware } from '../../infra/middleware';
import { ChatModule } from '../chat/chat.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([News]),
    NewsLanguageModule,
    AdminModule,
    CategoryModule,
    ChatModule,
  ],
  controllers: [NewsController],
  providers: [NewsService, NewsRepository],
  exports: [NewsService, NewsRepository],
})
export class NewsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NewsQueryParserMiddleware)
      .forRoutes(
        { path: 'news/published', method: RequestMethod.GET },
        { path: 'news/my-news', method: RequestMethod.GET },
      ),
      { path: 'news', method: RequestMethod.GET };
  }
}
