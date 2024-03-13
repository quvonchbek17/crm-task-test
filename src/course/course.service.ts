import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { InjectModel } from '@nestjs/sequelize';
import { Course } from './models/course.model';

@Injectable()
export class CourseService {
  constructor(
    @InjectModel(Course) private readonly courseModel: typeof Course,
  ) {}

  async createCourse(createCourseDto: CreateCourseDto) {
    const { course_name } = createCourseDto;

    const oldCourse = await this.courseModel.findOne({
      where: {
        course_name,
      },
    });
    if (oldCourse) {
      throw new BadRequestException('Course exists with this name');
    }
    const newCourse = await this.courseModel.create({ course_name });

    return newCourse;
  }

  async findAllCourses() {
    return this.courseModel.findAll({});
  }

  async findOneCourse(course_id: number) {
    const course = await this.courseModel.findByPk(course_id);
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    return course;
  }

  async updateCourse(course_id: number, updateCourseDto: UpdateCourseDto) {
    const course = await this.courseModel.findByPk(course_id);
    if (!course) {
      throw new BadRequestException('Course not found');
    }

    Object.defineProperty(updateCourseDto, 'course_id', { enumerable: false });

    const updated = await this.courseModel.update(updateCourseDto, {
      where: { course_id },
      returning: true,
    });

    return updated;
  }

  async removeCourse(course_id: number) {
    const course = await this.courseModel.findByPk(course_id);
    if (!course) {
      throw new BadRequestException('Course not found');
    }
    this.courseModel.destroy({ where: { course_id } });
    return { message: 'Delete success' };
  }
}
