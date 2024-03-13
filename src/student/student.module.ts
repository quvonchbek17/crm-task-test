import { Module, forwardRef } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Student } from './models/student.model';
import { Task } from '../task/models/task.model';
import { TaskModule } from '../task/task.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Student]), TaskModule, JwtModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
