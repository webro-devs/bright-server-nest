import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionController } from './permission.controller';
import { Permission } from './permission.entity';
import { PermissionRepository } from './permission.repository';
import { PermissionService } from './permission.service';

@Module({
  imports: [TypeOrmModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService, PermissionRepository],
  exports: [PermissionService, PermissionRepository],
})
export class PermissionModule {}
