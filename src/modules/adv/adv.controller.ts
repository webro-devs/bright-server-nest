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
  Query,
  Req,
  Patch,
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';
import { Request } from 'express';

import { CreateAdvertisementDto, UpdateAdvertisementDto } from './dto';
import { AdvertisementService } from './adv.service';
import { AdvertisementEnum } from '../../infra/shared/enums';

@ApiTags('Advertisement')
@Controller('advertisement')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all advertisements' })
  @ApiOkResponse({
    description: 'The advertisements were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getAll() {
    return await this.advertisementService.getAll();
  }

  @Get('/category')
  @ApiOperation({ summary: 'Method: returns advertisement by id' })
  @ApiOkResponse({
    description: 'The advertisement was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getByCategory(@Req() req: Request) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.toString().replace('::ffff:', '');
    return await this.advertisementService.getMidWithCategory(ip);
  }

  @Get('/:type')
  @ApiOperation({ summary: 'Method: returns all advertisements by type' })
  @ApiOkResponse({
    description: 'The advertisements were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getByType(@Param('type') type: string, @Req() req: Request) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.toString().replace('::ffff:', '');
    return await this.advertisementService.getByType(
      type as AdvertisementEnum,
      ip,
    );
  }

  @Get('/single/:id')
  @ApiOperation({ summary: 'Method: returns all advertisements' })
  @ApiOkResponse({
    description: 'The advertisements were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return await this.advertisementService.getById(id);
  }

  @Get('/incr-count/:id')
  @ApiOperation({ summary: 'Method: incr count advertisement by id' })
  @ApiOkResponse({
    description: 'The advertisement were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getIncrCount(@Param('id') id: string, @Req() req: Request) {
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    ip = ip.toString().replace('::ffff:', '');
    return await this.advertisementService.IncrCounts(id, ip);
  }

  @Get('/click/:id')
  @ApiOperation({ summary: 'Method: click advertisement by id' })
  @ApiOkResponse({
    description: 'The advertisements were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async clickAdv(@Param('id') id: string) {
    return await this.advertisementService.updateIsClickCount(id);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new advertisement' })
  @ApiCreatedResponse({
    description: 'The advertisement was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() data: CreateAdvertisementDto) {
    return await this.advertisementService.create(data);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating advertisement' })
  @ApiOkResponse({
    description: 'Advertisement was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateAdvertisementDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.advertisementService.update(data, id);
  }

  @Patch('/isActive')
  @ApiOperation({ summary: 'Method: updating advertisement isActive' })
  @ApiOkResponse({
    description: 'Advertisement isActive was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeActive(@Body() { isActive, ids }): Promise<UpdateResult> {
    return await this.advertisementService.updateIsActive(ids, isActive);
  }

  @Delete('/remove')
  @ApiOperation({ summary: 'Method: deleting advertisement' })
  @ApiOkResponse({
    description: 'Advertisement was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Body() ids: string[]) {
    await Promise.all(
      ids.map(async (id) => {
        await this.advertisementService.remove(id);
      }),
    );
    return 'Deleted';
  }
}
