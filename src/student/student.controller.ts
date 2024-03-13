import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorators/set-public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { LoginDto } from 'src/teacher/dto/login.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { RolesGuard } from 'src/guards/roles.guard';
import { StorageGetter } from '../decorators/storageGetter-cookie.decorator.ts';

@ApiTags('Student')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @ApiOperation({ summary: 'Create new Student' })
  @Roles(Role.ADMIN)
  @Post('create')
  createStudent(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @ApiOperation({ summary: 'Login Student' })
  @Public()
  @Post('login')
  loginStudent(@Body() loginStudentDto: LoginDto) {
    return this.studentService.loginStudent(loginStudentDto);
  }

  @ApiOperation({ summary: 'Get all Students' })
  @Get('all')
  findAllStudents() {
    return this.studentService.findAllStudents();
  }

  @ApiOperation({ summary: 'get my task' })
  @Roles(Role.STUDENT)
  @Get('my-task')
  getMyTask(@StorageGetter() accessToken: string) {
    return this.studentService.getMyTask(accessToken);
  }
  
  @ApiOperation({ summary: 'Get single Student' })
  @Roles(Role.ADMIN)
  @Get(':id')
  findOneStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.findOneStudent(id);
  }


  @ApiOperation({ summary: 'Update Student' })
  @Roles(Role.ADMIN)
  @Put(':id')
  updateStudent(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateStudentDto: UpdateStudentDto,
  ) {
    return this.studentService.updateStudent(id, updateStudentDto);
  }

  @ApiOperation({ summary: 'Delete Student' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  removeStudent(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.removeStudent(id);
  }
}
