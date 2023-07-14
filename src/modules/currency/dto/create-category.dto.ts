import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

class CreateCategoryDto {
  @ApiProperty({
    description: `Title in uzbek`,
    example: 'Dunyo yangliklari',
  })
  @IsNotEmpty()
  @IsString()
  uz: string;

  @ApiProperty({
    description: `Title in english`,
    example: 'Global news',
  })
  @IsNotEmpty()
  @IsString()
  en: string;

  @ApiProperty({
    description: `Title in russian`,
    example: 'Мировой новости',
  })
  @IsNotEmpty()
  @IsString()
  ru: string;

  @ApiProperty({
    description: `Title in узбек`,
    example: 'Дунё йангликлари',
  })
  @IsNotEmpty()
  @IsString()
  уз: string;
}

export default CreateCategoryDto;
