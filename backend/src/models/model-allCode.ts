import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import User from "./model-user";
import Schedual from "./model-schedual";
import Booking from "./model-booking";

@Table({
  tableName: AllCodes.TABLE_NAME,
})
class AllCodes extends Model {
  public static TABLE_NAME = "AllCodes" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_KEY = "key" as string;
  public static COLUMN_TYPE = "type" as string;
  public static COLUMN_VALUE_VI = "valueVi" as string;
  public static COLUMN_VALUE_EN = "valueEn" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: AllCodes.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: AllCodes.COLUMN_TYPE,
  })
  type!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  key!: string;

  @Column({
    type: DataType.STRING(255),
    field: AllCodes.COLUMN_VALUE_EN,
  })
  valueEn!: string;

  @Column({
    type: DataType.STRING(255),
    field: AllCodes.COLUMN_VALUE_VI,
  })
  valueVi!: string;

  @HasMany(() => User, {
    sourceKey: "key",
  })
  allcodeRole!: User[];

  @HasMany(() => User, {
    sourceKey: "key",
  })
  allcodePosition!: User[];

  @HasMany(() => Schedual, {
    sourceKey: "key",
  })
  schedual!: Schedual[];

  @HasMany(() => Booking, {
    sourceKey: "key",
  })
  booking!: Booking[];
}

export default AllCodes;
