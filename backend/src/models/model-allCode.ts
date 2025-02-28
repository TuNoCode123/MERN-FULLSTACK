import {
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from "sequelize-typescript";
import User from "./model-user";
import Schedual from "./model-schedual";
import Booking from "./model-booking";
import DoctorInfor from "./model-doctorInfor";

@Table({
  tableName: AllCodes.TABLE_NAME,
})
class AllCodes extends Model {
  public static TABLE_NAME = "AllCodes" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_KEY = "keyMap" as string;
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
    field: AllCodes.COLUMN_KEY,
    unique: true,
  })
  keyMap!: string;

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
    sourceKey: "keyMap",
  })
  allcodeRole!: User[];

  @HasMany(() => User, {
    sourceKey: "keyMap",
  })
  allcodePosition!: User[];

  @HasMany(() => Schedual, {
    sourceKey: "keyMap",
    as: "allcodeSchedual",
  })
  schedual!: Schedual[];

  @HasMany(() => Booking, {
    sourceKey: "keyMap",
    as: "allCode",
  })
  booking!: Booking[];

  @HasOne(() => DoctorInfor, {
    sourceKey: "keyMap",
    as: "price",
  })
  price!: DoctorInfor;

  @HasOne(() => DoctorInfor, {
    sourceKey: "keyMap",
    as: "provice",
  })
  provice!: DoctorInfor;

  @HasOne(() => DoctorInfor, {
    sourceKey: "keyMap",
    as: "payment",
  })
  payment!: DoctorInfor;

  @HasMany(() => User, {
    sourceKey: "keyMap",
    as: "genderAllcode",
  })
  allcodeGender!: User[];
}

export default AllCodes;
