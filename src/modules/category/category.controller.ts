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
import { UpdateResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
} from '@nestjs/swagger';

import { HttpException } from '../../infra/validation';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryService } from './category.service';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns category by id' })
  @ApiOkResponse({
    description: 'The category was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    return this.categoryService.getById(id);
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all categories' })
  @ApiOkResponse({
    description: 'The categories were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    return await this.categoryService.getAll();
  }

  @Get('/category/with-five')
  @ApiOperation({ summary: 'Method: returns categories with 5 news' })
  @ApiOkResponse({
    description: 'The categories were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getFiveCategory(@Req() req) {
    const relations = {
      news: req['relations'],
    };
    return await this.categoryService.getAllWithFiveNews(relations);
  }

  @Get('/:key/:Category')
  @ApiOperation({ summary: 'Method: returns category by key and name' })
  @ApiOkResponse({
    description: 'The categories were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getByName(@Param() { key, Category }) {
    return await this.categoryService.getCategoryByName(key, Category);
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new category' })
  @ApiCreatedResponse({
    description: 'The category was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() categoryData: CreateCategoryDto) {
    return await this.categoryService.create(categoryData);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating category' })
  @ApiOkResponse({
    description: 'Category was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() userData: UpdateCategoryDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    return await this.categoryService.update(userData, id);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting category' })
  @ApiOkResponse({
    description: 'Category was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    return await this.categoryService.remove(id);
  }
}
