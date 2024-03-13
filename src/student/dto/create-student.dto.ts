import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateStudentDto {
  @ApiProperty({
    type: String,
    description: 'Student firstname',
    default: 'Andrew',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'Student username',
    default: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    description: 'Student password',
    default: 'password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: Number,
    description: 'Group ID',
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  group_id: number;
}
