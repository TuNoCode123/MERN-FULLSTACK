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
import Speciality from "./model-speciality";
import Clinic from "./model-clinic";

@Table({
  tableName: DoctorInfor.TABLE_NAME,
})
class DoctorInfor extends Model {
  public static TABLE_NAME = "DoctorInfor" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_doctorId = "doctorId" as string;
  public static COLUMN_priceId = "priceId" as string;
  public static COLUMN_provinceId = "provinceId" as string;
  public static COLUMN_paymentId = "paymentId" as string;
  public static COLUMN_addressClinic = "addressClinic" as string;
  public static COLUMN_nameClinic = "nameClinic" as string;
  public static COLUMN_note = "note" as string;
  public static COLUMN_count = "count" as string;
  public static COLUMN_SpecialityId = "specialityId" as string;
  public static COLUMN_ClinicId = "clinicId" as string;

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: DoctorInfor.COLUMN_ID,
  })
  id!: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    field: DoctorInfor.COLUMN_doctorId,
    allowNull: false,
  })
  doctorId!: number;

  @BelongsTo(() => User, {
    targetKey: "id",
    foreignKey: DoctorInfor.COLUMN_doctorId,
    as: "doctorInfor",
  })
  doctor!: User;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING,
    field: DoctorInfor.COLUMN_priceId,
    allowNull: false,
  })
  priceId!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "keyMap",
    foreignKey: DoctorInfor.COLUMN_priceId,
    as: "price",
  })
  price!: AllCodes;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING,
    field: DoctorInfor.COLUMN_provinceId,
    allowNull: false,
  })
  provinceId!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "keyMap",
    foreignKey: DoctorInfor.COLUMN_provinceId,
    as: "provice",
  })
  provice!: AllCodes;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING,
    field: DoctorInfor.COLUMN_paymentId,
    allowNull: false,
  })
  paymentId!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "keyMap",
    foreignKey: DoctorInfor.COLUMN_paymentId,
    as: "payment",
  })
  payment!: AllCodes;

  @Column({
    type: DataType.STRING,
    field: DoctorInfor.COLUMN_addressClinic,
  })
  addressClinic!: string;

  @Column({
    type: DataType.STRING,
    field: DoctorInfor.COLUMN_nameClinic,
  })
  nameClinic!: string;

  @Column({
    type: DataType.TEXT("long"),
    field: DoctorInfor.COLUMN_note,
  })
  note!: string;

  @Column({
    type: DataType.INTEGER,
    field: DoctorInfor.COLUMN_count,
  })
  count!: number;

  @ForeignKey(() => Speciality)
  @Column({
    type: DataType.INTEGER,
    field: DoctorInfor.COLUMN_SpecialityId,
  })
  specialityId!: number;

  @BelongsTo(() => Speciality)
  userSpeciality!: Speciality;

  @ForeignKey(() => Clinic)
  @Column({
    type: DataType.INTEGER,
    field: DoctorInfor.COLUMN_ClinicId,
  })
  clinicId!: number;

  @BelongsTo(() => Clinic, {
    targetKey: "id",
    foreignKey: "clinicId",
    as: "clinicDoctor",
  })
  userClinic!: Clinic;
}
export default DoctorInfor;
