import { IsArray, IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseTextToArray } from '../../../infra/helpers';
import { ApiProperty } from '@nestjs/swagger';
class CreateAdminDto {
  @ApiProperty({
    description: `login`,
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: `password`,
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    description: `Phone number`,
    example: '+998998887766',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    description: `Full name`,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: `City`,
    example: 'Tashkent',
  })
  @IsNotEmpty()
  @IsString()
  city: string;

  @ApiProperty({
    description: `Education`,
    example: 'Oxford',
  })
  @IsNotEmpty()
  @IsString()
  education: string;

  @ApiProperty({
    description: `Admin avatar`,
    example: 'file',
    type: 'string',
    format: 'binary',
  })
  @IsOptional()
  avatar: Express.Multer.File;

  @ApiProperty({
    description: `Permissions`,
    example: ['uuid', 'uuid', 'uuid'],
  })
  @IsNotEmpty()
  // @IsArray()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray('permissions', value),
  )
  permissions: string[];

  @ApiProperty({
    description: `Position`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  position: string;
}

export default CreateAdminDto;
