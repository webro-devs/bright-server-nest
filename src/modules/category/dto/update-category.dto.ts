import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class UpdateCategoryDto {
  @ApiProperty({
    description: `Title in uzbek`,
    example: 'Dunyo yangliklari',
  })
  @IsOptional()
  @IsString()
  uz: string;

  @ApiProperty({
    description: `Title in english`,
    example: 'Global news',
  })
  @IsOptional()
  @IsString()
  en: string;

  @ApiProperty({
    description: `Title in russian`,
    example: 'Мировой новости',
  })
  @IsOptional()
  @IsString()
  ru: string;

  @ApiProperty({
    description: `Title in узбек`,
    example: 'Дунё йангликлари',
  })
  @IsOptional()
  @IsString()
  уз: string;
}

export default UpdateCategoryDto;
