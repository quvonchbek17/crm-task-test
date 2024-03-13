import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({
    type: String,
    description: 'Group name',
    default: 'Group 1',
  })
  @IsString()
  @IsNotEmpty()
  group_name: string;

  @ApiProperty({
    type: Number,
    description: 'Course ID',
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  course_id: number;

  @ApiProperty({
    type: Number,
    description: 'Teacher ID',
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  teacher_id: number;
}
