import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { Admin } from '../../admin/admin.entity';

class ReturnUser {
  @ApiProperty({
    description: `Name`,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: `User login`,
    example: 'admin',
  })
  @IsNotEmpty()
  @IsString()
  login: string;

  @ApiProperty({
    description: `User id`,
    example: 'sdawdadewsdewd2132seewq',
  })
  @IsNotEmpty()
  @IsString()
  id: string;

  constructor(user: Admin) {
    this.id = user.id;
    this.name = user.fullName;
    this.login = user.login;
  }
}

export default ReturnUser;
