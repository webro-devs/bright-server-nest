import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, DataSource, EntityManager, Repository } from 'typeorm';
import { fileService, hashPassword } from '../../infra/helpers';
import { HttpException } from '../../infra/validation';
import { PermissionService } from '../permission/permission.service';
import { PositionService } from '../position/position.service';
import { Admin } from './admin.entity';
import { CreateAdminDto, UpdateAdminDto, UpdateAdminProfileDto } from './dto';

Injectable();
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly permissionService: PermissionService,
    private readonly positionService: PositionService,
    private readonly connection: DataSource,
  ) {}

  async getAll(): Promise<Admin[]> {
    const admins = await this.adminRepository.find({
      where: { isActive: true },
      relations: {
        position: true,
        permissions: true,
      },
    });
    return admins;
  }

  async getById(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: {
        permissions: true,
        position: true,
        news: {
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          mainCategory: true,
        },
      },
      where: { id },
    });
    if (!admin) {
      throw new HttpException(true, 404, 'Admin not found');
    }
    admin.news = admin.news.filter((n) => n.state == 'published');
    return admin;
  }

  async getOne(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      relations: {
        permissions: true,
        position: true,
        news: {
          uz: true,
          ru: true,
          en: true,
          уз: true,
          categories: true,
          mainCategory: true,
        },
      },
      where: { id },
    });
    if (!admin) {
      console.log(admin);
      throw new HttpException(true, 404, 'Admin not found');
    }
    return admin;
  }

  async getOnlyAdmin(id: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({
      where: { id },
    });
    if (!admin) {
      console.log(admin);
      throw new HttpException(true, 404, 'Admin not found');
    }
    return admin;
  }

  async getByLogin(login: string) {
    const admin = await this.adminRepository
      .createQueryBuilder('admin')
      .addSelect('admin.password')
      .where('admin.login = :login', { login })
      .leftJoinAndSelect('admin.permissions', 'permission')
      .getOne();
    return admin;
  }

  async create(values: CreateAdminDto & { avatar: string }) {
    const admin = new Admin();
    const isLoginExist = await this.getByLogin(values.login);
    if (isLoginExist) {
      return new HttpException(true, 400, 'This login already exist!');
    }
    const permissions = await this.permissionService.getManyPermissionsById(
      values.permissions,
    );
    const position = await this.positionService.getById(values.position);
    admin.fullName = values.fullName;
    admin.education = values.education;
    admin.city = values.city;
    admin.login = values.login;
    admin.phone = values.phone;
    admin.permissions = permissions;
    admin.position = position;
    if (values.avatar) {
      admin.avatar = values.avatar;
    }

    await admin.hashPassword(values.password);
    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(admin).catch((err) => new Error(err));
    });
    return admin;
  }

  async update(values: UpdateAdminDto & { avatar: string }, id: string) {
    let admin = await this.getById(id);
    if (values.login) {
      const isLoginExist = await this.getByLogin(values.login);
      if (isLoginExist) {
        if (isLoginExist.id != id) {
          return new HttpException(true, 400, 'This login already exist!');
        }
      }
    }
    if (values.position) {
      const position = await this.positionService.getById(values.position);
      admin.position = position;
    }
    admin.city = values.city ? values.city : admin.city;
    admin.education = values.education ? values.education : admin.education;
    admin.fullName = values.fullName ? values.fullName : admin.fullName;
    admin.login = values.login ? values.login : admin.login;
    admin.phone = values.phone ? values.phone : admin.phone;
    if (values.permissions) {
      const permissions = await this.permissionService.getManyPermissionsById(
        values.permissions,
      );
      admin.permissions = permissions;
    }
    if (values.password) {
      const password = await hashPassword(values.password);
      admin.password = password;
    }
    if (values.avatar) {
      if (admin.avatar) {
        await fileService.removeFile(admin.avatar);
      }
      admin.avatar = values.avatar;
    }
    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(admin);
    });
    return admin;
  }

  async changeActive(id: string, isActive: boolean) {
    const response = await this.adminRepository.update(id, { isActive });
    return response;
  }

  async changeProfile(
    id: string,
    values: UpdateAdminProfileDto & { avatar: string },
  ) {
    let admin = await this.getById(id),
      password = admin.password,
      avatar = admin.avatar,
      position = admin.position;
    if (values.password) {
      password = await hashPassword(values.password);
    }
    if (values.avatar) {
      if (admin.avatar) {
        await fileService.removeFile(admin.avatar);
      }
      avatar = values.avatar;
    }
    if (values.position) {
      position = await this.positionService.getById(values.position);
    }
    const response = await this.adminRepository.update(id, {
      ...values,
      password,
      avatar,
      position,
    });
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.adminRepository.delete(id);
    return response;
  }
}
