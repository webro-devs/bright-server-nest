import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { parseTextToArray } from '../../../infra/helpers';
import { ApiProperty } from '@nestjs/swagger';
class UpdateAdminDto {
  @ApiProperty({
    description: `login`,
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  login: string;

  @ApiProperty({
    description: `password`,
    example: 'admin',
  })
  @IsOptional()
  @IsString()
  password: string;

  @ApiProperty({
    description: `Phone number`,
    example: '+998998887766',
  })
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty({
    description: `Full name`,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  fullName: string;

  @ApiProperty({
    description: `City`,
    example: 'Tashkent',
  })
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty({
    description: `Education`,
    example: 'Oxford',
  })
  @IsOptional()
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
  @IsOptional()
  @IsArray()
  @Transform(({ value }: { value: string }) =>
    parseTextToArray('permissions', value),
  )
  permissions: string[];

  @ApiProperty({
    description: `Position`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  position: string;
}

export default UpdateAdminDto;
