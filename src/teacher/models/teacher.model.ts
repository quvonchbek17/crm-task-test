import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Group } from 'src/group/models/group.model';

@Table({})
export class Teacher extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  })
  teacher_id: number;

  @Column({ type: DataType.STRING,  allowNull: false })
  firstname: string;

  @Column({ type: DataType.STRING,  allowNull: false })
  lastname: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  photo: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  username: string;

  @Column({ type: DataType.STRING,  allowNull: false })
  password: string;

  @HasMany(() => Group)
  groups: Group[];
}
