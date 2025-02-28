import {
  Column,
  DataType,
  Model,
  Table,
  BelongsTo,
  ForeignKey,
} from "sequelize-typescript";
import AllCodes from "./model-allCode";
import Database from "../configs/database";
import User from "./model-user";
import allcode from "../routes/allcode";

@Table({
  tableName: Schedual.TABLE_NAME,
})
class Schedual extends Model {
  public static TABLE_NAME = "Schedual" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_CURRENTNUMBER = "currentNumber" as string;
  public static COLUMN_MAXNUMBER = "maxNumber" as string;
  public static COLUMN_DATE = "date" as string;
  public static COLUMN_TIMETYPE = "timeType" as string;
  public static COLUMN_DOCTORID = "doctorId" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: Schedual.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    field: Schedual.COLUMN_CURRENTNUMBER,
  })
  currentNumber!: number;

  @Column({
    type: DataType.INTEGER,
    field: Schedual.COLUMN_MAXNUMBER,
  })
  maxNumber!: number;

  @Column({
    type: DataType.STRING,
    field: Schedual.COLUMN_DATE,
    allowNull: false,
  })
  date!: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: Schedual.COLUMN_DOCTORID,
    allowNull: false,
  })
  doctorId!: number;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING(255),
    field: Schedual.COLUMN_TIMETYPE,
    allowNull: false,
  })
  timeType!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "keyMap",
    as: "schedualAllcodes",
  })
  schedual!: AllCodes;
}
export default Schedual;
