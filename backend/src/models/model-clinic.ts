import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import User from "./model-user";
import inforDoctor from "../routes/infor-doctor";
import DoctorInfor from "./model-doctorInfor";

@Table({
  tableName: Clinic.TABLE_NAME,
})
class Clinic extends Model {
  public static TABLE_NAME = "Clinic" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_IMAGE = "image" as string;
  public static COLUMN_NAME_CLINIC = "nameClinic" as string;
  public static COLUMN_CONTENT_HTML = "contentHtml" as string;
  public static COLUMN_CONTENT_TEXT = "contentText" as string;

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
    field: Clinic.COLUMN_NAME_CLINIC,
  })
  nameClinic!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: Clinic.COLUMN_CONTENT_HTML,
  })
  contentHtml!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: Clinic.COLUMN_CONTENT_TEXT,
  })
  contentText!: string;

  @HasMany(() => DoctorInfor, {
    sourceKey: "id",
    as: "clinicDoctor",
  })
  clinic!: DoctorInfor[];
}
export default Clinic;
