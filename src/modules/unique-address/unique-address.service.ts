import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { DataSource } from 'typeorm/data-source';
import { UniqueAddress } from './unique-address.entity';
import { CreateUniqueAddressDto } from './dto';
import { GetAdvertisementDto } from '../adv/dto';
import { EntityManager } from 'typeorm/entity-manager/EntityManager';

@Injectable()
export class UniqueAddressService {
  constructor(
    private readonly uniqueAddressRepository: Repository<UniqueAddress>,
    private readonly connection: DataSource,
  ) {}

  async getAll(): Promise<UniqueAddress[]> {
    const data = await this.uniqueAddressRepository.find();
    return data;
  }

  async getById(id: string): Promise<UniqueAddress> {
    const data = await this.uniqueAddressRepository.findOne({
      where: { id },
      relations: {
        advertisements: true,
      },
    });
    return data;
  }

  async getByIp(ipAddress: string): Promise<UniqueAddress> {
    const data = await this.uniqueAddressRepository.findOne({
      where: { ipAddress },
      relations: {
        advertisements: true,
      },
    });
    return data;
  }

  async create(values: CreateUniqueAddressDto) {
    const response = this.uniqueAddressRepository.create(values);
    return await this.uniqueAddressRepository.save(response);
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.uniqueAddressRepository.delete(id);
    return response;
  }

  async WorkingWithIpAddress(
    value: GetAdvertisementDto & {
      count: number;
    },
  ) {
    const data = await this.uniqueAddressRepository.findOne({
      where: { ipAddress: value.ipAddress },
    });
    if (!data) {
      const response = await this.create({
        ipAddress: value.ipAddress,
      });
      response[value.type] = 1;
      await this.connection.transaction(async (manager: EntityManager) => {
        await manager.save(response).catch((err) => new Error(err));
      });
      return { data: response, index: 0 };
    } else {
      const index = data[value.type] < value.count ? data[value.type] : 0;
      if (data[value.type] < value.count) {
        data[value.type] += 1;
      } else {
        data[value.type] = 1;
      }
      await this.connection.transaction(async (manager: EntityManager) => {
        await manager.save(data).catch((err) => new Error(err));
      });
      return { data, index };
    }
  }
}
