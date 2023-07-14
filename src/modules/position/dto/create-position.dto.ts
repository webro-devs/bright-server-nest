import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

class CreatePositionDto {
  @ApiProperty({
    description: `Title`,
    example: 'manager',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    description: `Description`,
    example: '...',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}

export default CreatePositionDto;
