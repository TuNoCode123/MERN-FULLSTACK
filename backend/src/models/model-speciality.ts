import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import User from "./model-user";

@Table({
  tableName: Speciality.TABLE_NAME,
})
class Speciality extends Model {
  public static TABLE_NAME = "Speciality" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_IMAGE = "image" as string;
  public static COLUMN_DESCRIPTION = "description" as string;
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Speciality.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: Speciality.COLUMN_IMAGE,
  })
  image!: string;

  @Column({
    type: DataType.STRING(255),
    field: Speciality.COLUMN_DESCRIPTION,
  })
  description!: string;

  // @HasMany(() => User)
  // users!: User[];
}
export default Speciality;
