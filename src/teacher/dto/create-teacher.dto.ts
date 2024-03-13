import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({
    type: String,
    description: 'Teacher firstname',
    default: 'Tomas',
  })
  @IsString()
  @IsNotEmpty()
  firstname: string;

  @ApiProperty({
    type: String,
    description: 'Teacher lastname',
    default: 'Edison',
  })
  @IsString()
  @IsNotEmpty()
  lastname: string;

  @ApiProperty({
    type: String,
    description: 'Teacher photo',
    default: 'https://picsum.photos/300/300',
  })
  @IsUrl()
  @IsNotEmpty()
  photo: string;

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
