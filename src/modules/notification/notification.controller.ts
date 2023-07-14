import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Param,
  Get,
  Req,
  Patch,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import {
  CreateNotificationDto,
  UpdateIsViewedNotificationDto,
  UpdateStateNotificationDto,
} from './dto';
import { NotificationService } from './notification.service';

@ApiTags('Notification')
@Controller('notification')
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns notification by id' })
  @ApiOkResponse({
    description: 'The notification was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return this.notificationService.getById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all notifications' })
  @ApiOkResponse({
    description: 'The notifications were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.notificationService.getAll();
  }

  @Get('/my-notifications')
  @ApiOperation({ summary: 'Method: returns my notifications' })
  @ApiOkResponse({
    description: 'My notifications were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getMyData(@Req() request) {
    return await this.notificationService.getMyNotifications(request.user.id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new notification' })
  @ApiCreatedResponse({
    description: 'The notification was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateNotificationDto, @Req() request) {
    return await this.notificationService.create(data, request.user.id);
  }

  @Patch('/isViewed')
  @ApiOperation({ summary: 'Method: updating notifications isViewed' })
  @ApiOkResponse({
    description: 'Notifications isViewed was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(@Body() data: UpdateIsViewedNotificationDto) {
    return await this.notificationService.updateIsViewed(data.notificationIds);
  }

  @Patch('/state')
  @ApiOperation({ summary: 'Method: updating notifications state' })
  @ApiOkResponse({
    description: 'Notifications state was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeState(@Body() data: UpdateStateNotificationDto) {
    return await this.notificationService.updateState(
      data.notificationIds,
      data.state,
    );
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting notification' })
  @ApiOkResponse({
    description: 'Notification was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.notificationService.remove(id);
  }
}
