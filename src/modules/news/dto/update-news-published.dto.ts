import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

class UpdateNewsPublishDto {
  @ApiProperty({
    description: `newsIds`,
    example: ['uuid', 'uuid', 'uuid'],
  })
  @IsNotEmpty()
  @IsArray()
  newsIds: string[];

  @ApiProperty({
    description: `Telegram is checked`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  tg: boolean;

  @ApiProperty({
    description: `Instagram is checked`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  inst: boolean;
}

export default UpdateNewsPublishDto;
