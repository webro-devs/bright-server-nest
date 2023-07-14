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
import { CreatePermissionDto, UpUpdatePermissionDto } from './dto';
import { PermissionService } from './permission.service';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns permission by id' })
  @ApiOkResponse({
    description: 'The permission was returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string) {
    try {
      return this.permissionService.getById(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all permissions' })
  @ApiOkResponse({
    description: 'The permissions were returned successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.permissionService.getAll();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Post('/')
  @ApiOperation({ summary: 'Method: creates new permission' })
  @ApiCreatedResponse({
    description: 'The permission was created successfully',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() categoryData: CreatePermissionDto) {
    try {
      return await this.permissionService.create(categoryData);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Method: updating permission' })
  @ApiOkResponse({
    description: 'Permission was changed',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() userData: UpUpdatePermissionDto,
    @Param('id') id: string,
  ): Promise<UpdateResult> {
    try {
      return await this.permissionService.update(userData, id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting permission' })
  @ApiOkResponse({
    description: 'Permission was deleted',
  })
  @ApiForbiddenResponse({ description: 'Unauthorized Request' })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string) {
    try {
      return await this.permissionService.remove(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
