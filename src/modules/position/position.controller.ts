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
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { HttpException } from '../../infra/validation';
import { CreatePositionDto, UpdatePositionDto } from './dto';
import { PositionService } from './position.service';

@ApiTags('Position')
@Controller('position')
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns position by id' })
  @ApiOkResponse({
    description: 'The position was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    try {
      return this.positionService.getById(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all positions' })
  @ApiOkResponse({
    description: 'The positions were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.positionService.getAll();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new position' })
  @ApiCreatedResponse({
    description: 'The position was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreatePositionDto) {
    try {
      return await this.positionService.create(data);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating position' })
  @ApiOkResponse({
    description: 'Position was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() userData: UpdatePositionDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.positionService.update(userData, id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting position' })
  @ApiOkResponse({
    description: 'Position was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    try {
      return await this.positionService.remove(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
