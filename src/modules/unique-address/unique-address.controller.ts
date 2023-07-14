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

import { HttpException } from '../../infra/validation';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryService } from './unique-address.service';

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
    try {
      return this.categoryService.getById(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all categories' })
  @ApiOkResponse({
    description: 'The categories were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.categoryService.getAll();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new category' })
  @ApiCreatedResponse({
    description: 'The category was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() categoryData: CreateCategoryDto) {
    try {
      return await this.categoryService.create(categoryData);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
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
    try {
      return await this.categoryService.update(userData, id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting category' })
  @ApiOkResponse({
    description: 'Category was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    try {
      return await this.categoryService.remove(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
