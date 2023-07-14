import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

class UpdatePositionDto {
  @ApiProperty({
    description: `Title`,
    example: 'manager',
  })
  @IsOptional()
  @IsString()
  title: string;

  @ApiProperty({
    description: `Description`,
    example: '...',
  })
  @IsOptional()
  @IsString()
  description: string;
}

export default UpdatePositionDto;
