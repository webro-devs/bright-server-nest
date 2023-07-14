import {
  IsArray,
  IsObject,
  IsOptional,
  IsString,
  isArray,
  isObject,
} from 'class-validator';
import { State } from '../../../infra/shared/enums';
import { NewsLanguage } from '../../news-language/news-language.entity';
import { Transform } from 'class-transformer';
import { parseTextToArray, parseTextToObject } from '../../../infra/helpers';
import { ApiProperty } from '@nestjs/swagger';

class UpdateNewsDto {
  @ApiProperty({
    description: `State`,
    example: 'general access',
  })
  @IsOptional()
  state: State;

  @ApiProperty({
    description: `PublishDate`,
    example: '2023-03-16T17:03:11.027Z',
  })
  @IsOptional()
  @IsString()
  publishDate: string;

  @ApiProperty({
    description: `Categories`,
    example: ['uuid', 'uuid'],
  })
  @IsOptional()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray('categories', value),
  )
  categories: string[];

  @ApiProperty({
    description: `Main Category`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  mainCategory: string;

  @ApiProperty({
    description: `uz`,
    example: {
      title: '',
      description: '',
      shortDescription: '',
      descImg: ['url', 'url'],
      shortLink: '',
      tags: ['#work', '#rest'],
    },
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject('uz', value))
  uz: NewsLanguage;

  @ApiProperty({
    description: `ru`,
    example: {
      title: '',
      description: '',
      shortDescription: '',
      descImg: ['url', 'url'],
      shortLink: '',
      tags: ['#work', '#rest'],
    },
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject('ru', value))
  ru: NewsLanguage;

  @ApiProperty({
    description: `en`,
    example: {
      title: '',
      description: '',
      shortDescription: '',
      descImg: ['url', 'url'],
      shortLink: '',
      tags: ['#work', '#rest'],
    },
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject('en', value))
  en: NewsLanguage;

  @ApiProperty({
    description: `уз`,
    example: {
      title: '',
      description: '',
      shortDescription: '',
      descImg: ['url', 'url'],
      shortLink: '',
      tags: ['#work', '#rest'],
    },
  })
  @IsOptional()
  @IsObject()
  @Transform(({ value }: { value: string }) => parseTextToObject('уз', value))
  уз: NewsLanguage;
}

export default UpdateNewsDto;
