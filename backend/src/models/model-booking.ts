import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import AllCodes from "./model-allCode";

@Table({
  tableName: Booking.TABLE_NAME,
})
class Booking extends Model {
  public static TABLE_NAME = "Booking" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_STATUSID = "statusId" as string;
  public static COLUMN_DOCTORID = "doctorId" as string;
  public static COLUMN_PATIENTID = "patientId" as string;
  public static COLUMN_DATE = "date" as string;
  public static COLUMN_TIMETYPE = "timeType" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Booking.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: Booking.COLUMN_STATUSID,
  })
  statusId!: string;

  @Column({
    type: DataType.STRING(255),
    field: Booking.COLUMN_DOCTORID,
  })
  doctorId!: number;

  @Column({
    type: DataType.STRING(255),
    field: Booking.COLUMN_PATIENTID,
  })
  patientId!: number;

  @Column({
    type: DataType.DATE,
    field: Booking.COLUMN_DATE,
  })
  date!: Date;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING(255),
    field: Booking.COLUMN_TIMETYPE,
  })
  timeType!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "key",
  })
  booking!: AllCodes;
}
export default Booking;
