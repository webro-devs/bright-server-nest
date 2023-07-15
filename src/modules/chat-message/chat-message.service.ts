import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { HttpException } from '../../infra/validation';
import { ChatMessage } from './chat-message.entity';
import { CreateMessageDto } from './dto';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: Repository<ChatMessage>,
  ) {}

  async getAll(): Promise<ChatMessage[]> {
    const getAll = await this.chatMessageRepository.find({
      relations: {
        user: true,
      },
    });
    return getAll;
  }

  async getById(id: string): Promise<ChatMessage> {
    const response = await this.chatMessageRepository.findOne({
      where: { id },
      relations: {
        user: {
          position: true,
        },
      },
    });
    return response;
  }

  async create(values: CreateMessageDto): Promise<ChatMessage> {
    const response = await this.chatMessageRepository
      .createQueryBuilder()
      .insert()
      .into(ChatMessage)
      .values(values as unknown as ChatMessage)
      .returning('id')
      .execute();

    return await this.getById(response.raw[0].id);
  }

  async update(
    body: string,
    id: string,
    user_id: string,
  ): Promise<UpdateResult> {
    const msg = await this.chatMessageRepository.findOne({
      relations: { user: true },
      where: { id },
    });

    if (msg?.user?.id == user_id) {
      const edit = await this.chatMessageRepository
        .createQueryBuilder()
        .update()
        .set({ body })
        .where('id = :id', { id })
        .execute();
      return edit;
    } else {
      return { raw: 'asdasd', generatedMaps: [] };
    }
  }

  async remove(id: string, user_id: string): Promise<DeleteResult> {
    const msg = await this.chatMessageRepository.findOne({
      relations: { user: true },
      where: { id },
    });
    if (msg.user.id == user_id) {
      const response = await this.chatMessageRepository.delete(id);
      return response;
    } else {
      return { raw: 'asdasd' };
    }
  }
}
