import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Course } from 'src/course/models/course.model';
import { Teacher } from 'src/teacher/models/teacher.model';

@Table({})
export class Group extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  group_id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  group_name: string;

  @ForeignKey(() => Teacher)
  @Column({ type: DataType.INTEGER, allowNull: false })
  teacher_id: number;

  @ForeignKey(() => Course)
  @Column({ type: DataType.INTEGER, allowNull: false })
  course_id: number;

  // @HasMany(() => Task)
  // groups: Task[];

  @BelongsTo(() => Course, { onDelete: 'CASCADE' })
  course: Course;

  @BelongsTo(() => Teacher, { onDelete: 'CASCADE' })
  teacher: Teacher;
}
