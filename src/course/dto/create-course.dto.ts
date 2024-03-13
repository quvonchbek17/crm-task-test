import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCourseDto {
  @ApiProperty({
    type: String,
    description: 'Course name',
    default: 'Course 1',
  })
  @IsString()
  @IsNotEmpty()
  course_name: string;
}
