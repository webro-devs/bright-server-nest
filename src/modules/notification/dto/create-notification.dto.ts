import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class CreateNotificationDto {
  @ApiProperty({
    description: `newsIds`,
    example: ['uuid', 'uuid'],
  })
  @IsNotEmpty()
  @IsArray()
  newsIds: string[];
}

export default CreateNotificationDto;
