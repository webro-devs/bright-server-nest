import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class InsertNotificationDto {
  @ApiProperty({
    description: `news`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsArray()
  news: string;

  @ApiProperty({
    description: `From`,
    example: 'uuid',
  })
  @IsOptional()
  @IsString()
  from: string;
}

export default InsertNotificationDto;
