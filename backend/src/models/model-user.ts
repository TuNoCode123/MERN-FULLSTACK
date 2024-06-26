import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import AllCodes from "./model-allCode";
import Speciality from "./model-speciality";

@Table({
  tableName: User.TABLE_NAME,
})
class User extends Model {
  public static TABLE_NAME = "User" as string;
  public static COLUMN_ID = "id" as string;
  public static COLUMN_LAST_NAME = "lastName" as string;
  public static COLUMN_FIRST_NAME = "firstName" as string;
  public static COLUMN_FULLNAME = "fullName" as string;

  public static COLUMN_EMAIL = "email" as string;
  public static COLUMN_PASSWORD = "passWord" as string;
  public static COLUMN_ADDRESS = "address" as string;
  public static COLUMN_PHONENUMBER = "phoneNumber" as string;
  public static COLUMN_GENDER = "gender" as string;
  public static COLUMN_ROLEID = "roleId" as string;
  public static COLUMN_SPECTIALID = "spectialId" as string;
  public static COLUMN_POSITIONID = "positionId" as string;
  public static COLUMN_IMAGE = "image" as string;
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    field: User.COLUMN_ID,
  })
  id!: number;

  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_EMAIL,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_PASSWORD,
  })
  passWord!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_FIRST_NAME,
  })
  firstName!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_LAST_NAME,
  })
  lastName!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_ADDRESS,
  })
  address!: string;

  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_PHONENUMBER,
  })
  phoneNumber!: string;

  @Column({
    type: DataType.STRING,
    field: User.COLUMN_GENDER,
  })
  gender!: string;

  @Column({
    type: DataType.BLOB("long"),
    field: User.COLUMN_IMAGE,
  })
  image!: Buffer;

  // define foriegnKey For AllCode
  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_ROLEID,
  })
  roleId!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "key",
    foreignKey: User.COLUMN_ROLEID,
    as: "role",
  })
  userRole!: AllCodes;

  // define foriegnKey For Speciality
  @ForeignKey(() => Speciality)
  @Column({
    type: DataType.INTEGER,
    field: User.COLUMN_SPECTIALID,
  })
  spectialId!: number;

  @BelongsTo(() => Speciality)
  userSpeciality!: Speciality;

  @ForeignKey(() => AllCodes)
  @Column({
    type: DataType.STRING(255),
    field: User.COLUMN_POSITIONID,
  })
  positionId!: string;

  @BelongsTo(() => AllCodes, {
    targetKey: "key",
    foreignKey: User.COLUMN_POSITIONID,
    as: "position",
  })
  userPosition!: AllCodes;
}

export default User;
