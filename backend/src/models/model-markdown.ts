import {
  Column,
  DataType,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./model-user";

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
  public static COLUMN_CONTENT_INTRO_HTML = "contentIntroHtml" as string;
  public static COLUMN_CONTENT_INTRO_TEXT = "contentIntrotext" as string;
  // <h2>Bác sĩ Chuyên khoa II Lê Văn Hiếu Nhân</h2>
  // <ul>
  // <li>Hơn 20 năm kinh nghiệm chuyên khoa Ngoại Tiết niệu - Nam học</li>
  // <li>Từng công tác tại khoa Ngoại Tiết niệu - Bệnh viện Bình Dân TP. HCM</li>
  // <li>Bác sĩ nhận khám mọi độ tuổi</li>
  // </ul>
  // <h2>Khám và điều trị</h2>
  // <ul>
  // <li>Phẫu thuật sỏi niệu: sỏi thận, niệu quản, bàng quang, niệu đạo</li>
  // <li>Chuyên gia tán sỏi niệu ngoài cơ thể</li>
  // <li>Phẫu thuật bướu niệu: bướu thận, bướu bể thận - niệu quản, bàng quang, tuyến tiền liệt, niệu đạo, tinh hoàn</li>
  // <li>Phẫu thuật tạo hình niệu: tạo hình hẹp niệu quản, hẹp niệu đạo; tạo hình bàng quang tân tạo bằng ruột trong bướu bàng quang; tạo hình mở rộng bàng quang bằng ruột trong bàng quang thần kinh, lao bàng quang</li>
  // <li>Phẫu thuật niệu - thần kinh, niệu chức năng</li>
  // <li>Phẫu thuật tiểu không kiểm soát</li>
  // <li>Phẫu thuật dị tật bẩm sinh đường tiết niệu: Gồm hẹp khúc nối bể thận - niệu quản; hẹp khúc nối niệu quản-bàng quang; thận móng ngựa; thận-niệu quản đôi…</li>
  // <li>Bệnh lý Nam khoa</li>
  // </ul>
  // <h2>Quá trình công tác</h2>
  // <ul>
  // <li>Bác sĩ điều trị khoa Ngoại Tổng hợp - Bệnh viện Đa khoa Quốc tế Nam Sài Gòn (07/2022 - Nay)</li>
  // <li>Bác sĩ Trưởng khoa Ngoại Tiết Niệu Bệnh viện ngoại khoa Sante TP. HCM (12/2021 - 7/2022)</li>
  // <li>Bác sĩ Trưởng đơn vị tán sỏi ngoài cơ thể, Bệnh viện Bình Dân - TP. HCM (2013 - 12/2021)</li>
  // <li>Bác sĩ khoa Ngoại Tiết niệu, Bệnh viện Bình Dân - TP. HCM (2001- 12/2021)</li>
  // <li>Bác sĩ khoa Ngoại Tiết niệu - Trung tâm chuẩn đoán Y khoa Medic TP. HCM (1999 - 2001)</li>
  // </ul>
  // <h2>Quá trình đào tạo</h2>
  // <ul>
  // <li>Tốt nghiệp Bác sĩ Chuyên khoa II Ngoại Tiết niệu, Đại học Y Dược TP. HCM (2013)</li>
  // <li>Tốt nghiệp Bác sĩ Chuyên khoa I Ngoại Tiết niệu, Đại học Y Dược TP. HCM (2009)</li>
  // <li>Tốt nghiệp Bác sĩ Đa khoa, Đại học Y Dược TP. HCM (1999)</li>
  // </ul>
  // <h2>Chứng chỉ trong nước hoặc nước ngoài</h2>
  // <ul>
  // <li>Chứng chỉ phẫu thuật nội soi ổ bụng nâng cao (2011)</li>
  // <li>Chứng chỉ phẫu thuật nội soi nâng cao (2011)</li>
  // </ul>
  // <h2>Thành viên các hội tổ chức chuyên môn</h2>
  // <ul>
  // <li>Thành viên Hội Thận - Tiết niệu Việt Nam (VUNA)</li>
  // <li>Thành viên Hội Thận - Tiết Niệu TP. HCM (HUNA)</li>
  // <li>Thành viên Hội Niệu khoa Châu Á (UAA)</li>
  // <li>Thành viên Hội Niệu khoa Châu Âu (EAU)</li>
  // </ul>

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
    type: DataType.STRING,
    field: Markdown.COLUMN_CONTENT_INTRO_HTML,
  })
  contentIntroHtml!: string;

  @Column({
    type: DataType.STRING,
    field: Markdown.COLUMN_CONTENT_INTRO_TEXT,
  })
  contentIntroText!: string;

  @ForeignKey(() => User)
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

  @BelongsTo(() => User, {
    targetKey: "id",
    foreignKey: Markdown.COLUMN_DOCTOR_ID,
  })
  markdownUser!: User;
}
export default Markdown;
