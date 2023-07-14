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
} from '@nestjs/common';
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { CreateAdvertisementDto, UpdateAdvertisementDto } from './dto';
import { AdvertisementService } from './adv.service';

@ApiTags('Advertisement')
@Controller('advertisement')
export class CategoryController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns advertisement by id' })
  @ApiOkResponse({
    description: 'The advertisement was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return this.advertisementService.getById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all advertisements' })
  @ApiOkResponse({
    description: 'The advertisements were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.advertisementService.getAll();
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new advertisement' })
  @ApiCreatedResponse({
    description: 'The advertisement was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() categoryData: CreateAdvertisementDto) {
    return await this.advertisementService.create(categoryData);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating advertisement' })
  @ApiOkResponse({
    description: 'Advertisement was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() userData: UpdateAdvertisementDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.advertisementService.update(userData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting category' })
  @ApiOkResponse({
    description: 'Category was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.advertisementService.remove(id);
  }
}
