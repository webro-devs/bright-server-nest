import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { Advertisement } from './adv.entity';
import { AdvertisementEnum } from '../../infra/shared/enums';
import { CreateAdvertisementDto, UpdateAdvertisementDto } from './dto';
import { UniqueAddressService } from '../unique-address/unique-address.service';
import { CategoryService } from '../category/category.service';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private readonly advertisementRepository: Repository<Advertisement>,
    private readonly uniqueAddressService: UniqueAddressService,
    private readonly categoryService: CategoryService,
  ) {}

  async getAll(): Promise<Advertisement[]> {
    const data = await this.advertisementRepository.find({
      order: { date: 'DESC' },
      relations: { creator: true },
    });
    return data;
  }

  async getById(id: string): Promise<Advertisement> {
    const data = await this.advertisementRepository.findOne({
      where: { id },
      relations: {
        creator: true,
      },
    });
    return data;
  }

  async getByType(type: AdvertisementEnum, ip: string) {
    let index;
    const [data, count] = await this.advertisementRepository.findAndCount({
      where: { type, isActive: true },
      order: { date: 'ASC' },
    });

    if (data.length > 0) {
      if (type == AdvertisementEnum.top) {
        const value = await this.getByTypeTop(ip, count);
        index = value.index;
      } else if (type == AdvertisementEnum.aside) {
        const value = await this.getByTypeAside(ip, count);
        index = value.index;
      } else if (type == AdvertisementEnum.mid) {
        const value = await this.getByTypeMid(ip, count);
        index = value.index;
      } else if (type == AdvertisementEnum.midSingle) {
        const value = await this.getByTypeSingle(ip, count);
        index = value.index;
      } else if (type == AdvertisementEnum.vip) {
        const value = await this.getByTypeVip(ip, count);
        index = value.index;
      }
      return data[index];
    } else {
      return [];
    }
  }

  async getByTypeTop(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: 'topCount',
        count,
      });
    return { uniqueIp: data, index };
  }

  async getByTypeMid(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: 'midCount',
        count,
      });
    return { uniqueIp: data, index };
  }

  async getByTypeAside(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: 'sideCount',
        count,
      });
    return { uniqueIp: data, index };
  }

  async getByTypeSingle(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: 'singleCount',
        count,
      });
    return { uniqueIp: data, index };
  }

  async getByTypeVip(ip: string, count: number) {
    const { data, index } =
      await this.uniqueAddressService.WorkingWithIpAddress({
        ipAddress: ip,
        type: 'vipCount',
        count,
      });
    return { uniqueIp: data, index };
  }

  async IncrCounts(id: string, ip: string) {
    const data = await this.advertisementRepository.findOne({
      where: { id },
      relations: { uniqueAddresses: true },
    });
    const isExist = data.uniqueAddresses.find((f) => f.ipAddress == ip);
    if (!isExist) {
      const uniqueAddress = await this.uniqueAddressService.getByIp(ip);
      data.uniqueAddresses.push(uniqueAddress);
      data.viewUniqueCount += 1;
    }
    data.viewTotalCount += 1;
    await this.advertisementRepository.save(data);
    return data;
  }

  async getMidWithCategory(ip: string) {
    const result = [];
    const [dat, count] = await this.advertisementRepository.findAndCount({
      where: { type: AdvertisementEnum.mid, isActive: true },
      order: { date: 'ASC' },
    });
    await this.getByTypeMid(ip, count);
    const data = await this.advertisementRepository.find({
      where: { type: AdvertisementEnum.mid, isActive: true },
    });

    const categories = await this.categoryService.getAll();
    categories.forEach((c) => {
      const adv = data.filter((d) => d.categoryId == c.id);
      if (adv.length > 0) {
        const min = Math.min(...adv.map((d) => d.viewTotalCount));
        result.push(adv.find((a) => a.viewTotalCount == min));
      }
    });
    return result;
  }

  async create(values: CreateAdvertisementDto) {
    const response = this.advertisementRepository
      .createQueryBuilder()
      .insert()
      .into(Advertisement)
      .values(values as unknown as Advertisement)
      .execute();
    return response;
  }

  async updateIsActive(ids: string[], isActive: boolean) {
    const response = await this.advertisementRepository
      .createQueryBuilder()
      .update()
      .set({ isActive })
      .where('id IN(:...ids)', { ids })
      .execute();
    return response;
  }

  async updateIsClickCount(id: string) {
    const data = await this.advertisementRepository.findOne({
      where: { id },
    });
    data.clickCount += 1;
    await this.advertisementRepository.save(data);
    return data;
  }

  async update(
    values: UpdateAdvertisementDto,
    id: string,
  ): Promise<UpdateResult> {
    const response = await this.advertisementRepository
      .createQueryBuilder()
      .update()
      .set(values as unknown as Advertisement)
      .where('id = :id', { id })
      .execute();
    return response;
  }

  async remove(id: string): Promise<DeleteResult> {
    const response = await this.advertisementRepository.delete(id);
    return response;
  }
}
