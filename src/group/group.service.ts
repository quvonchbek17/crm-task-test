import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { TeacherService } from 'src/teacher/teacher.service';
import { CourseService } from 'src/course/course.service';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private readonly groupModel: typeof Group,
    private readonly teacherService: TeacherService,
    private readonly courseService: CourseService,
  ) {}

  async createGroup(createGroupDto: CreateGroupDto) {
    const { group_name, teacher_id, course_id } = createGroupDto;

    const oldGroup = await this.groupModel.findOne({
      where: {
        group_name,
      },
    });
    if (oldGroup) {
      throw new BadRequestException('Group exists with this name');
    }

    const course = await this.courseService.findOneCourse(course_id);
    if (!course) {
      throw new BadRequestException('Course is not exist with this name');
    }

    const teacher = await this.teacherService.findOneTeacher(teacher_id);
    if (!teacher) {
      throw new BadRequestException('Teacher is not exist with this name');
    }

    const newGroup = await this.groupModel.create({ ...createGroupDto });

    return newGroup;
  }

  async findAllGroups() {
    return this.groupModel.findAll({});
  }

  async findOneGroup(group_id: number) {
    const group = await this.groupModel.findByPk(group_id);
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    return group;
  }

  async updateGroup(group_id: number, updateGroupDto: UpdateGroupDto) {
    const group = await this.groupModel.findByPk(group_id);
    if (!group) {
      throw new BadRequestException('Group not found');
    }

    const course = await this.courseService.findOneCourse(
      updateGroupDto.course_id,
    );
    if (!course) {
      throw new BadRequestException('Course is not exist with this name');
    }

    const teacher = await this.teacherService.findOneTeacher(
      updateGroupDto.teacher_id,
    );
    if (!teacher) {
      throw new BadRequestException('Teacher is not exist with this name');
    }

    Object.defineProperty(updateGroupDto, 'group_id', { enumerable: false });

    const updated = await this.groupModel.update(updateGroupDto, {
      where: { group_id },
      returning: true,
    });

    return updated;
  }

  async removeGroup(group_id: number) {
    const group = await this.groupModel.findByPk(group_id);
    if (!group) {
      throw new BadRequestException('Group not found');
    }
    this.groupModel.destroy({ where: { group_id } });
    return { message: 'Delete success' };
  }
}
