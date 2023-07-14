import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class UpdatePermissionDto {
  @ApiProperty({
    description: `Title`,
    example: 'Создать пользователя',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default UpdatePermissionDto;
