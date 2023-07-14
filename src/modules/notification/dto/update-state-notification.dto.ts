import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

class UpdateStateNotificationDto {
  @ApiProperty({
    description: `notificationIds`,
    example: ['uuid', 'uuid'],
  })
  @IsNotEmpty()
  @IsArray()
  notificationIds: string[];

  @ApiProperty({
    description: `State`,
    example: 'rejected',
  })
  @IsNotEmpty()
  @IsString()
  state: string;
}

export default UpdateStateNotificationDto;
