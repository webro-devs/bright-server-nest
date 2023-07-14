import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, Repository } from "typeorm";
import { HttpException } from "../../infra/validation";
import { Chat } from "./chat.entity";
import { ChatRepository } from "./chat.repository";
import { CreateChatDto } from "./dto";

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat)
    private readonly chatRepository: ChatRepository
    ) {}

  async getAll(): Promise<Chat[]> {
    try {
      const getAll = await this.chatRepository.find({
        relations: {
          messages: {
            user: {
              position: true,
            },
          },
        },
      });
      return getAll;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Chat> {
    try {
      const response = await this.chatRepository.findOne({
        where: { news: { id } },
        relations: {
          messages: {
            user: true,
          },
        },
      });
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async create(values: CreateChatDto) {
    try {
      const response = this.chatRepository
        .createQueryBuilder()
        .insert()
        .into(Chat)
        .values(values as unknown as Chat)
        .execute();
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async remove(id: string): Promise<DeleteResult> {
    try {
      const response = await this.chatRepository.delete(id);
      return response;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
