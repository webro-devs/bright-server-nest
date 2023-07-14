import { Repository } from 'typeorm';

import { ChatMessage } from './chat-message.entity';

export class ChatMessageRepository extends Repository<ChatMessage> {}
