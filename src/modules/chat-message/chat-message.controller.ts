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
  Req,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { HttpException } from '../../infra/validation';
import { CreateMessageDto, UpdateMessageDto } from './dto';
import { ChatMessageService } from './chat-message.service';

@ApiTags('Chat Message')
@Controller('chat_message')
export class ChatMessageController {
  constructor(private readonly chatMessageService: ChatMessageService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns chat message by id' })
  @ApiOkResponse({
    description: 'The chat was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    try {
      return this.chatMessageService.getById(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all chat messages' })
  @ApiOkResponse({
    description: 'The chat messages were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.chatMessageService.getAll();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Post('/:chatId')
  @ApiOperation({ summary: 'Method: creates new chat message' })
  @ApiCreatedResponse({
    description: 'The chat message was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() data: CreateMessageDto,
    @Param('chatId') chatId: string,
    @Req() req,
  ) {
    const response = await this.chatMessageService.create({
      ...data,
      chat: chatId,
      user: req.user.id,
    });

    return response;
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new chat message' })
  @ApiCreatedResponse({
    description: 'The chat message was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async createMessage(@Body() data: CreateMessageDto, @Req() req) {
    const response = await this.chatMessageService.create({
      ...data,
      user: req.user.id,
    });

    return response;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating message' })
  @ApiOkResponse({
    description: 'Chat message was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() { body }, @Param('id') id: string, @Req() req) {
    return await this.chatMessageService.update(body, id, req.user.id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting chat message' })
  @ApiOkResponse({
    description: 'Chat message was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string, @Req() req) {
      return await this.chatMessageService.remove(id, req.user.id);
  }
}
