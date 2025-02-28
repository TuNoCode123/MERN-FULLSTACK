import { Column, DataType, Model, Table, HasMany } from "sequelize-typescript";
import User from "./model-user";
import DoctorInfor from "./model-doctorInfor";

@Table({
  tableName: Speciality.TABLE_NAME,
})
class Speciality extends Model {
  public static TABLE_NAME = "Speciality" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_IMAGE = "image" as string;
  public static COLUMN_DESCRIPTION = "nameSpeciality" as string;
  public static COLUMN_CONTENT_HTML = "contentHtml" as string;
  public static COLUMN_CONTENT_TEXT = "contentText" as string;

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
  nameSpeciality!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: Speciality.COLUMN_CONTENT_HTML,
  })
  contentHtml!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: Speciality.COLUMN_CONTENT_TEXT,
  })
  contentText!: string;

  @HasMany(() => DoctorInfor)
  specialityDoctor!: DoctorInfor[];
}
export default Speciality;
