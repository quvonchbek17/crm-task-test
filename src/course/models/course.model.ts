import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Group } from 'src/group/models/group.model';

@Table({})
export class Course extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  course_id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  course_name: string;

  @HasMany(() => Group)
  groups: Group[];
}
