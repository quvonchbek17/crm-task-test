import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Role } from 'src/enums/role.enum';
import { Student } from './models/student.model';
import { CreateTeacherDto } from 'src/teacher/dto/create-teacher.dto';
import { LoginDto } from 'src/teacher/dto/login.dto';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { TaskService } from '../task/task.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student) private readonly studentModel: typeof Student,
    private readonly jwtService: JwtService,
    private readonly taskService: TaskService,
  ) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const { username, password } = createStudentDto;

    const oldStudent = await this.studentModel.findOne({
      where: {
        username,
      },
    });
    if (oldStudent) {
      throw new BadRequestException('Student exist with this username');
    }

    const hashedPassword = await bcrypt.hash(password, 7);
    const newStudent = await this.studentModel.create({
      ...createStudentDto,
      password: hashedPassword,
    });

    return newStudent;
  }

  async loginStudent(loginStudentDto: LoginDto) {
    const { username, password } = loginStudentDto;
    const user = await this.studentModel.findOne({ where: { username } });
    if (!user) {
      throw new BadRequestException('Username or password is incorrect!');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Username or password is incorrect!');
    }
    const token = this.jwtService.sign(
      { id: user.student_id, role: Role.STUDENT },
      {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      },
    );
    return {
      firstname: user.firstname,
      username: user.username,
      role: Role.TEACHER,
      token,
    };
  }

  async findAllStudents() {
    return this.studentModel.findAll({});
  }

  async findOneStudent(student_id: number) {
    const student = await this.studentModel.findByPk(student_id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    return student;
  }
  async getMyTask(accessToken: string) {
    console.log('chiqdi');
    const payload = this.jwtService.decode(accessToken);

    const student = await this.studentModel.findByPk(payload.id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    const tasks = await this.taskService.findMyTasks(student.group_id);
    return tasks;
  }

  async updateStudent(student_id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.studentModel.findByPk(student_id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }

    Object.defineProperty(updateStudentDto, 'student_id', {
      enumerable: false,
    });

    const updated = await this.studentModel.update(updateStudentDto, {
      where: { student_id },
      returning: true,
    });

    return updated;
  }

  async removeStudent(student_id: number) {
    const student = await this.studentModel.findByPk(student_id);
    if (!student) {
      throw new BadRequestException('Student not found');
    }
    this.studentModel.destroy({ where: { student_id } });
    return { message: 'Delete success' };
  }
}
