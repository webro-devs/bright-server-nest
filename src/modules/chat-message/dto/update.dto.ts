import { IsNotEmpty, IsObject, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class UpdateMessageDto {
  @ApiProperty({
    description: `user`,
    example: 'uuid',
  })
  @IsString()
  @IsOptional()
  user: string;

  @ApiProperty({
    description: `Body`,
    example: 'some text',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: `chat`,
    example: 'uuid',
  })
  @IsString()
  @IsOptional()
  chat: string;
}

export default UpdateMessageDto;
