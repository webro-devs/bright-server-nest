import { Repository } from 'typeorm';

import { Chat } from './chat.entity';

export class ChatRepository extends Repository<Chat> {}
