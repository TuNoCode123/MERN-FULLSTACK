import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: History.TABLE_NAME,
})
class History extends Model {
  public static TABLE_NAME = "History" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_PATIENTID = "patientId" as string;
  public static COLUMN_DOCTORID = "doctorId" as string;
  public static COLUMN_DESCRIPTION = "description" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: History.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: History.COLUMN_PATIENTID,
  })
  patientId!: number;

  @Column({
    type: DataType.INTEGER,
    field: History.COLUMN_DOCTORID,
  })
  doctorId!: number;

  @Column({
    type: DataType.STRING(255),
    field: History.COLUMN_DESCRIPTION,
  })
  description!: string;
}
export default History;
