import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateTaskDto {
  @ApiProperty({
    type: String,
    description: 'Task title',
    default: 'Task 1',
  })
  @IsString()
  @IsNotEmpty()
  task_title: string;

  @ApiProperty({
    type: Number,
    description: 'Group ID',
    default: 1,
  })
  @IsNumber()
  @IsPositive()
  group_id: number;
}
