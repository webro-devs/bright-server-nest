import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Delete,
  Patch,
  Param,
  Get,
  Query,
  Put,
  Req,
} from '@nestjs/common';
import { DeleteResult } from 'typeorm';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
  ApiOperation,
  ApiConsumes,
} from '@nestjs/swagger';

import { CreateAdminDto, UpdateAdminDto, UpdateAdminProfileDto } from './dto';
import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { HttpException } from '../../infra/validation';
import { fileService } from '../../infra/helpers';
import { PermissionsGuard } from '../auth/decorators/roles.decorator';
import { PermissionEnum } from '../../infra/shared/enums';
import { Res } from '@nestjs/common/decorators';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('/')
  @ApiOperation({ summary: 'Method: returns all admins' })
  @ApiOkResponse({
    description: 'The admins were returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getData() {
    try {
      return await this.adminService.getAll();
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/me')
  @ApiOperation({ summary: 'Method: returns current admin' })
  @ApiOkResponse({
    description: 'The admin was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getMe(@Req() request) {
    try {
      const admin = await this.adminService.getOne(request.user.id);
      return admin;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Method: returns single admin by id' })
  @ApiOkResponse({
    description: 'The admin was returned successfully',
  })
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id') id: string, @Res() res) {
    try {
      return this.adminService.getById(id);
    } catch (err) {
      res.status(500).send(new HttpException(true, 500, err.message));
    }
  }

  @PermissionsGuard(PermissionEnum['Создать пользователя'])
  @Post('/')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Method: creates new admin' })
  @ApiCreatedResponse({
    description: 'The admin was created successfully',
  })
  @HttpCode(HttpStatus.CREATED)
  async saveData(@Body() data: CreateAdminDto, @Req() request) {
    try {
      let avatar = { url: null, error: null };

      if (request?.files?.avatar) {
        avatar = await fileService.uploadImage(request?.files?.avatar);
        console.log(avatar);

        if (avatar.error) {
          throw new HttpException(true, 500, 'Image upload error');
        }
      }
      return await this.adminService.create({ ...data, avatar: avatar.url });
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Put('/:id')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Method: updating admin' })
  @ApiOkResponse({
    description: 'Admin was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeData(
    @Body() data: UpdateAdminDto,
    @Param('id') id: string,
    @Req() request,
  ) {
    try {
      let avatar = { url: null, error: null };
      if (request?.files?.avatar) {
        avatar = await fileService.uploadImage(request?.files?.avatar);
        if (avatar.error) {
          throw new HttpException(true, 500, 'Image upload error');
        }
      }
      return await this.adminService.update(
        { ...data, avatar: avatar.url },
        id,
      );
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/profile/my')
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Method: updating admin profile' })
  @ApiOkResponse({
    description: 'Admin was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeProfile(@Body() data: UpdateAdminProfileDto, @Req() request) {
    try {
      let avatar = { url: null, error: null };
      if (request?.files?.avatar) {
        avatar = await fileService.uploadImage(request?.files?.avatar);
        if (avatar.error) {
          throw new HttpException(true, 500, 'Image upload error');
        }
      }
      return await this.adminService.changeProfile(request.user.id, {
        ...data,
        avatar: avatar.url,
      });
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Patch('/active/:id')
  @ApiOperation({ summary: 'Method: updating admin active' })
  @ApiOkResponse({
    description: 'Admin active was changed',
  })
  @HttpCode(HttpStatus.OK)
  async changeActive(@Body() { isActive }, @Param('id') id: string) {
    try {
      return await this.adminService.changeActive(id, isActive);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Method: deleting admin' })
  @ApiOkResponse({
    description: 'Admin was deleted',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteData(@Param('id') id: string): Promise<DeleteResult> {
    try {
      return await this.adminService.remove(id);
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }
}
