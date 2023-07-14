import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Put,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { HttpException } from '../../infra/validation';
import { CreateChatDto } from './dto';
import { ChatService } from './chat.service';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns chat by id' })
  @ApiOkResponse({
    description: 'The chat was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    try {
      return this.chatService.getById(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all chats' })
  @ApiOkResponse({
    description: 'The chats were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.chatService.getAll();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new chat' })
  @ApiCreatedResponse({
    description: 'The chat was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateChatDto) {
    try {
      return await this.chatService.create(data);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting chat' })
  @ApiOkResponse({
    description: 'Chat was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    try {
      return await this.chatService.remove(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
