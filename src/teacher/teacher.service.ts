import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Teacher } from './models/teacher.model';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { LoginDto } from './dto/login.dto';
import { uploadFile } from 'src/utils/fie-upload';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enums/role.enum';
import { Group } from 'src/group/models/group.model';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel(Teacher) private readonly teacherModel: typeof Teacher,
    private readonly jwtService: JwtService,
  ) {}

  async createTeacher(createTeacherDto: CreateTeacherDto) {
    const { username } = createTeacherDto;

    const oldteacher = await this.teacherModel.findOne({
      where: {
        username,
      },
    });
    if (oldteacher) {
      throw new BadRequestException('Teacher exist with this username');
    }

    const hashedPassword = await bcrypt.hash(createTeacherDto.password, 7);
    const newTeacher = await this.teacherModel.create({
      ...createTeacherDto,
      password: hashedPassword,
    });

    return newTeacher;
  }

  async loginTeacher(LoginDto: LoginDto) {
    const { username, password } = LoginDto;
    const user = await this.teacherModel.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('Username or password is incorrect!');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Username or password is incorrect!');
    }
    const token = this.jwtService.sign(
      { id: user.teacher_id, role: Role.TEACHER },
      {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      },
    );
    return {
      firstname: user.firstname,
      latsname: user.lastname,
      photo: user.photo,
      username: user.username,
      role: Role.TEACHER,
      token,
    };
  }

  async uploadTeacherPhoto(photo: Express.Multer.File) {
    try {
      const filename = await uploadFile(photo);
      return { photo: filename };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAllTeachers() {
    return this.teacherModel.findAll({});
  }

  async findOneTeacher(teacher_id: number) {
    const teacher = await this.teacherModel.findByPk(teacher_id);
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }
    return teacher;
  }

  async findTeacherGroups(request: any) {
    const { user } = request;

    const teacher = await this.teacherModel.findByPk(user.id, {
      include: {
        model: Group,
        as: 'groups',
        attributes: ['group_id', 'group_name'],
      },
    });

    if (!teacher) {
      throw new UnauthorizedException();
    }

    return teacher?.groups ?? [];
  }

  async updateTeacher(teacher_id: number, updateTeacherDto: UpdateTeacherDto) {
    const teacher = await this.teacherModel.findByPk(teacher_id);
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }

    Object.defineProperty(updateTeacherDto, 'teacher_id', {
      enumerable: false,
    });

    const updated = await this.teacherModel.update(updateTeacherDto, {
      where: { teacher_id },
      returning: true,
    });

    return updated;
  }

  async removeTeacher(teacher_id: number) {
    const teacher = await this.teacherModel.findByPk(teacher_id);
    if (!teacher) {
      throw new BadRequestException('Teacher not found');
    }
    this.teacherModel.destroy({ where: { teacher_id } });
    return { message: 'Delete success' };
  }
}
