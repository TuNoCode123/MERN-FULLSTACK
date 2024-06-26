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

@Table({
  tableName: Schedual.TABLE_NAME,
})
class Schedual extends Model {
  public static TABLE_NAME = "Schedual" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_CURRENTNUMBER = "currentNumber" as string;
  public static COLUMN_MAXNUMBER = "maxNumebr" as string;
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
    type: DataType.DATE,
    field: Schedual.COLUMN_DATE,
  })
  date!: Date;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING(255),
    field: Schedual.COLUMN_TIMETYPE,
  })
  timeType!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "key",
  })
  schedual!: AllCodes;
}
export default Schedual;
