import { Injectable } from '@nestjs/common';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto, UpUpdatePermissionDto } from './dto';
import { HttpException } from '../../infra/validation';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRepository } from './permission.repository';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: PermissionRepository,
  ) {}

  async getAll(): Promise<Permission[]> {
    try {
      const categories = await this.permissionRepository.find();
      return categories;
    } catch (err) {
      throw new HttpException(true, 500, err.message);
    }
  }

  async getById(id: string): Promise<Permission> {
    try {
      const category = await this.permissionRepository.findOne({
        where: { id },
        relations: {
          admins: {
            position: true,
          },
        },
      });
      return category;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async getManyPermissionsById(ids: string[]) {
    try {
      return this.permissionRepository
        .createQueryBuilder()
        .where('id IN(:...ids)', { ids })
        .getMany();
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async create(values: CreatePermissionDto): Promise<Permission> {
    try {
      const response = this.permissionRepository.create(values);
      return this.permissionRepository.save(response);
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async update(
    values: UpUpdatePermissionDto,
    id: string,
  ): Promise<UpdateResult> {
    try {
      const response = await this.permissionRepository.update(id, values);
      return response;
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }

  async remove(id: string): Promise<DeleteResult | HttpException> {
    try {
      const response = await this.permissionRepository.delete(id);
      return new HttpException(false, 204, 'goooood ...');
    } catch (error) {
      throw new HttpException(true, 500, error.message);
    }
  }
}
