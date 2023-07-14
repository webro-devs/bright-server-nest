import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { HttpException } from '../../infra/validation';
import { ChatMessage } from './chat-message.entity';
import { ChatMessageRepository } from './chat-message.repository';
import { CreateMessageDto } from './dto';

@Injectable()
export class ChatMessageService {
  constructor(
    @InjectRepository(ChatMessage)
    private readonly chatMessageRepository: ChatMessageRepository,
  ) {}

  async getAll(): Promise<ChatMessage[]> {
    try {
      const getAll = await this.chatMessageRepository.find({
        relations: {
          user: true,
        },
      });
      return getAll;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<ChatMessage> {
    try {
      const response = await this.chatMessageRepository.findOne({
        where: { id },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateMessageDto): Promise<ChatMessage> {
    try {
      const response = this.chatMessageRepository.create(values);
      return await this.chatMessageRepository.save(response);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async update(body: string, id: string): Promise<UpdateResult> {
    try {
      const edit = await this.chatMessageRepository
        .createQueryBuilder()
        .update()
        .set({ body })
        .where('id = :id', { id })
        .execute();
      return edit;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.chatMessageRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
