import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

class CreatePermissionDto {
  @ApiProperty({
    description: `Title`,
    example: 'Создать пользователя',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
}

export default CreatePermissionDto;
