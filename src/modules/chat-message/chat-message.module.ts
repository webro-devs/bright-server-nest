import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatMessageController } from './chat-message.controller';
import { ChatMessage } from './chat-message.entity';
import { ChatMessageService } from './chat-message.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  controllers: [ChatMessageController],
  providers: [ChatMessageService],
  exports: [ChatMessageService],
})
export class ChatMessageModule {}
