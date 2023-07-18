import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueAddress } from './unique-address.entity';
import { UniqueAddressService } from './unique-address.service';

@Module({
  imports: [TypeOrmModule.forFeature([UniqueAddress])],
  providers: [UniqueAddressService],
  exports: [UniqueAddressService],
})
export class CategoryModule {}
