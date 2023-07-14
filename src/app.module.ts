import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import configuration from './config';
import { AdminModule } from './modules/admin/admin.module';
import { AuthModule } from './modules/auth/auth.module';
import { CategoryModule } from './modules/category/category.module';
import { ChatMessageModule } from './modules/chat-message/chat-message.module';
import { ChatModule } from './modules/chat/chat.module';
import { NewsModule } from './modules/news/news.module';
import { NewsLanguageModule } from './modules/news-language/news-language.module';
import { NewsEditorModule } from './modules/editors/editors.module';
import { NotificationModule } from './modules/notification/notification.module';
import { PermissionModule } from './modules/permission/permission.module';
import { PositionModule } from './modules/position/position.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    AuthModule,
    AdminModule,
    CategoryModule,
    ChatModule,
    ChatMessageModule,
    NewsModule,
    NewsEditorModule,
    NewsLanguageModule,
    NotificationModule,
    PermissionModule,
    PositionModule,
  ],
})
export class AppModule {}
