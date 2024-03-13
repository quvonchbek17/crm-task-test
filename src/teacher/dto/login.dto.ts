import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    type: String,
    description: 'Teacher username',
    default: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Teacher password',
    default: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
