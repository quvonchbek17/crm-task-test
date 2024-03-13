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
  Req,
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
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginDto } from './dto/login.dto';
import { FileUploadDto } from './dto/file-upload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Teacher')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @ApiOperation({ summary: 'Create new Teacher' })
  @Roles(Role.ADMIN)
  @Post('create')
  createTeacher(@Body() createTeacherDto: CreateTeacherDto) {
    return this.teacherService.createTeacher(createTeacherDto);
  }

  @ApiOperation({ summary: 'Upload Teacher photo' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Teacher photo',
    type: FileUploadDto,
  })
  @UseInterceptors(FileInterceptor('photo'))
  @Roles(Role.ADMIN)
  @Post('upload-photo')
  uploadTeacherPhoto(@UploadedFile() photo: Express.Multer.File) {
    return this.teacherService.uploadTeacherPhoto(photo);
  }

  @ApiOperation({ summary: 'Login Teacher' })
  @Public()
  @Post('login')
  loginTeacher(@Body() LoginDto: LoginDto) {
    return this.teacherService.loginTeacher(LoginDto);
  }

  @ApiOperation({ summary: 'Get all Teachers' })
  @Roles(Role.ADMIN)
  @Get('all')
  findAllTeachers() {
    return this.teacherService.findAllTeachers();
  }

  @ApiOperation({ summary: 'Get Teacher Groups' })
  @Roles(Role.TEACHER)
  @Get('get-groups')
  findTeacherGroups(@Req() request: any) {
    return this.teacherService.findTeacherGroups(request);
  }

  @ApiOperation({ summary: 'Get single Teacher' })
  @Roles(Role.ADMIN, Role.TEACHER)
  @Get(':id')
  findOneTeacher(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.findOneTeacher(id);
  }

  @ApiOperation({ summary: 'Update Teacher' })
  @Roles(Role.ADMIN)
  @Put(':id')
  updateTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ) {
    return this.teacherService.updateTeacher(id, updateTeacherDto);
  }

  @ApiOperation({ summary: 'Delete Teacher' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  removeTeacher(@Param('id', ParseIntPipe) id: number) {
    return this.teacherService.removeTeacher(id);
  }
}
