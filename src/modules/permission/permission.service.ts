import { Injectable } from '@nestjs/common';
import { UpdateResult, Repository } from 'typeorm';
import { Permission } from './permission.entity';
import { CreatePermissionDto, UpUpdatePermissionDto } from './dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly permissionRepository: Repository<Permission>,
  ) {}

  async getAll(): Promise<Permission[]> {
    const categories = await this.permissionRepository.find();
    return categories;
  }

  async getById(id: string): Promise<Permission> {
    const category = await this.permissionRepository.findOne({
      where: { id },
      relations: {
        admins: {
          position: true,
        },
      },
    });
    return category;
  }

  async getManyPermissionsById(ids: string[]) {
    return this.permissionRepository
      .createQueryBuilder()
      .where('id IN(:...ids)', { ids })
      .getMany();
  }

  async create(values: CreatePermissionDto): Promise<Permission> {
    const response = this.permissionRepository.create(values);
    return this.permissionRepository.save(response);
  }

  async update(
    values: UpUpdatePermissionDto,
    id: string,
  ): Promise<UpdateResult> {
    const response = await this.permissionRepository.update(id, values);
    return response;
  }

  async remove(id: string) {
    const response = await this.permissionRepository.delete(id);
    return { error: false, status: 204, message: 'goooood ...' };
  }
}
