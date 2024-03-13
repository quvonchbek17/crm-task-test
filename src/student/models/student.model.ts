import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/models/group.model';

@Table({})
export class Student extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  student_id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  password: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group[];
}
