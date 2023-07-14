import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

class UpdateIsViewedNotificationDto {
  @ApiProperty({
    description: `notificationIds`,
    example: ['uuid', 'uuid'],
  })
  @IsNotEmpty()
  @IsArray()
  notificationIds: string[];
}

export default UpdateIsViewedNotificationDto;
