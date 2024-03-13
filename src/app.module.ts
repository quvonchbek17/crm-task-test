import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { CourseModule } from './course/course.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TeacherModule } from './teacher/teacher.module';
import { GroupModule } from './group/group.module';
import { StudentModule } from './student/student.module';
import { TaskModule } from './task/task.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD.toString(),
      database: process.env.DB_DATABASE,
      synchronize: true,
      autoLoadModels: true,
      logging: false,
    }),
    JwtModule.register({
      global: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'data'),
      serveRoot: '/api',
      exclude: ['index.html'],
    }),
    CourseModule,
    TeacherModule,
    GroupModule,
    StudentModule,
    TaskModule,
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
