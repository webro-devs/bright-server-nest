import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Admin } from './admin.entity';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PermissionModule } from '../permission/permission.module';
import { PositionModule } from '../position/position.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin]),
    PermissionModule,
    PositionModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
