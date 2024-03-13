import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  ParseIntPipe,
  Put,
} from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';
import { Public } from 'src/decorators/set-public.decorator';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { RolesGuard } from 'src/guards/roles.guard';

@ApiTags('Course')
@ApiBearerAuth()
@UseGuards(AuthGuard, RolesGuard)
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @ApiOperation({ summary: 'Create new Course' })
  @Roles(Role.ADMIN)
  @Post('create')
  createCourse(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.createCourse(createCourseDto);
  }

  @ApiOperation({ summary: 'Get all Courses' })
  @Public()
  @Get('all')
  findAllCourses() {
    return this.courseService.findAllCourses();
  }

  @ApiOperation({ summary: 'Get single Course' })
  @Public()
  @Get(':id')
  findOneCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.findOneCourse(id);
  }

  @ApiOperation({ summary: 'Update Course' })
  @Roles(Role.ADMIN)
  @Put(':id')
  updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCourseDto: UpdateCourseDto,
  ) {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  @ApiOperation({ summary: 'Delete Course' })
  @Roles(Role.ADMIN)
  @Delete(':id')
  removeCourse(@Param('id', ParseIntPipe) id: number) {
    return this.courseService.removeCourse(id);
  }
}
