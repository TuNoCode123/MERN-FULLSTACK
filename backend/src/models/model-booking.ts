import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import AllCodes from "./model-allCode";
import User from "./model-user";

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
  public static COLUMN_TOKEN = "token" as string;
  public static COLUMN_PayMent = "payment" as string;

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

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Booking.COLUMN_PATIENTID,
  })
  patientId!: number;

  @BelongsTo(() => User, {
    targetKey: "id",
    as: "doctorBooking",
  })
  bookingDoctor!: User;

  @Column({
    type: DataType.STRING,
    field: Booking.COLUMN_DATE,
  })
  date!: string;

  @Column({
    type: DataType.STRING,
    field: Booking.COLUMN_TOKEN,
  })
  token!: string;

  @Column({
    type: DataType.BOOLEAN,
    field: Booking.COLUMN_PayMent,
    defaultValue: false,
  })
  payment!: string;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING(255),
    field: Booking.COLUMN_TIMETYPE,
  })
  timeType!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "keyMap",
    as: "allCode",
  })
  booking!: AllCodes;
}
export default Booking;
