import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './models/group.model';
import { TeacherModule } from 'src/teacher/teacher.module';
import { CourseModule } from 'src/course/course.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    SequelizeModule.forFeature([Group]),
    TeacherModule,
    CourseModule,
    JwtModule,
  ],
  controllers: [GroupController],
  providers: [GroupService],
  exports: [GroupService],
})
export class GroupModule {}
