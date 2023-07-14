import { IsOptional, IsString } from 'class-validator';
import { State } from '../enums';

export class NewsQueryDto {
  @IsOptional()
  @IsString()
  startDate: string;
  @IsOptional()
  @IsString()
  endDate: string;
  @IsOptional()
  @IsString()
  creatorId: string;
  @IsOptional()
  @IsString()
  categoryId: string;
  @IsOptional()
  @IsString()
  mainCategoryId: string;
  @IsOptional()
  @IsString()
  state: State;
  @IsOptional()
  @IsString()
  lang: string;
}
