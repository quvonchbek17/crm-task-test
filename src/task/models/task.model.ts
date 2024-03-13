import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/models/group.model';

@Table({})
export class Task extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  task_id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  task_title: string;

  @ForeignKey(() => Group)
  @Column({ type: DataType.INTEGER, allowNull: false })
  group_id: number;

  @BelongsTo(() => Group)
  group: Group;
}
