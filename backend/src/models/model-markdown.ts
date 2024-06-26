import {
  Column,
  DataType,
  Model,
  Table,
  HasMany,
  AllowNull,
} from "sequelize-typescript";

@Table({
  tableName: Markdown.TABLE_NAME,
})
class Markdown extends Model {
  public static TABLE_NAME = "Markdown" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_CONTENT_HTML = "contentHtml" as string;
  public static COLUMN_CONTENT_TEXT = "contentText" as string;
  public static COLUMN_DOCTOR_ID = "doctorId" as string;
  public static COLUMN_CLINIC_ID = "clinicId" as string;
  public static COLUMN_SPECIALITY_ID = "specialityId" as string;
  public static COLUMN_INTRODUCE_DOCTOR = "introduceDoctor" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Markdown.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.TEXT("long"),
    field: Markdown.COLUMN_CONTENT_HTML,
  })
  contentHtml!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: Markdown.COLUMN_CONTENT_TEXT,
  })
  contentText!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: Markdown.COLUMN_INTRODUCE_DOCTOR,
  })
  introduceDoctor!: string;

  @Column({
    type: DataType.INTEGER,
    field: Markdown.COLUMN_DOCTOR_ID,
    allowNull: true,
  })
  doctorId!: string;

  @Column({
    type: DataType.INTEGER,
    field: Markdown.COLUMN_CLINIC_ID,
    allowNull: true,
  })
  clinicId!: string;

  @Column({
    type: DataType.INTEGER,
    field: Markdown.COLUMN_SPECIALITY_ID,
    allowNull: true,
  })
  specialityId!: string;
}
export default Markdown;
