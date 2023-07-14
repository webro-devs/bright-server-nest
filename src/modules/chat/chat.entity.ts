import {
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ChatMessage } from '../chat-message/chat-message.entity';
import { News } from '../news/news.entity';

@Entity('chat')
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => News, (news) => news.id, { onDelete: 'CASCADE' })
  @JoinColumn()
  news: News;

  @OneToMany(() => ChatMessage, (messages) => messages.chat)
  messages: ChatMessage[];
}
