import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './adv.entity';
import { AdvertisementController } from './adv.controller';
import { AdvertisementService } from './adv.service';

@Module({
  imports: [TypeOrmModule.forFeature([Advertisement])],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
  exports: [AdvertisementService],
})
export class AdvertisementModule {}
