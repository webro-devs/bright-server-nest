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
      return this.positionService.getById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all positions' })
  @ApiOkResponse({
    description: 'The positions were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
      return await this.positionService.getAll();
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new position' })
  @ApiCreatedResponse({
    description: 'The position was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreatePositionDto) {
      return await this.positionService.create(data);
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
      return await this.positionService.update(userData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting position' })
  @ApiOkResponse({
    description: 'Position was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
      return await this.positionService.remove(id);
  }
}
