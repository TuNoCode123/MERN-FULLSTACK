import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";

@Table({
  tableName: Clinic.TABLE_NAME,
})
class Clinic extends Model {
  public static TABLE_NAME = "Clinic" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_IMAGE = "image" as string;
  public static COLUMN_DESCRIPTION = "description" as string;
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Clinic.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: Clinic.COLUMN_IMAGE,
  })
  image!: string;

  @Column({
    type: DataType.STRING(255),
    field: Clinic.COLUMN_DESCRIPTION,
  })
  description!: string;
}
export default Clinic;
