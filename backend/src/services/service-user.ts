import { resolve } from "path";
import User from "../models/model-user";
import reqUser from "../respitory/req-User";
import { IdataRes, userType } from "../utils/interfaces/interface-user";
import AllCodes from "../models/model-allCode";
import Markdown from "../models/model-markdown";
import Schedual from "../models/model-schedual";
import { rejects } from "assert";
import DoctorInfor from "../models/model-doctorInfor";
import Booking from "../models/model-booking";
import transporter from "../configs/configMailer";
import { v4 as uuidv4 } from "uuid";
import Clinic from "../models/model-clinic";
import Speciality from "../models/model-speciality";
import dbRoom from "../models-mongoo.ts/room";
import { raw } from "mysql2";
import hash from "../utils/generall/hashPassWords";
interface Ires {
  rows: User[];
  count: number;
}
export interface Ischdual {
  date: string;
  timeType: string;
  doctorId: number;
  maxNumber?: any;
}
class ServiceUser {
  updateUser = (user: userType): Promise<number | string> => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await reqUser.updateUser(user);
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  };
  createUser = (user: userType): Promise<[userType | boolean, boolean]> => {
    return new Promise(async (resolve, reject) => {
      try {
        const [userNew, created] = await reqUser.createUser(user);

        resolve([userNew, created]);
      } catch (error) {
        reject("");
      }
    });
  };
  deleteUser = (id: number): Promise<number | string> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const response = await reqUser.deleteUserRq(id);
        resolve(response);
      } catch (error) {}
    });
  };
  getAllDoctor = async (): Promise<Partial<Ires>> => {
    try {
      const response = await User.findAndCountAll({
        include: [
          {
            model: AllCodes,
            as: "position",
          },
          {
            model: AllCodes,
            as: "role",
          },
          {
            model: DoctorInfor,
            as: "doctorInfor",
            include: [
              {
                model: Speciality,
                attributes: ["nameSpeciality"],
              },
            ],
          },
        ],
        where: { roleId: "R2" },
        attributes: {
          exclude: ["passWord"],
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return {};
    }
  };
  getAllDoctorWithoutImage = async (): Promise<Partial<Ires>> => {
    try {
      const response = await User.findAndCountAll({
        include: [
          {
            model: AllCodes,
            as: "position",
          },
          {
            model: AllCodes,
            as: "role",
          },
          { model: Markdown },
        ],
        where: { roleId: "R2" },
        attributes: {
          exclude: ["passWord", "image"],
        },
      });
      return response;
    } catch (error) {
      console.log(error);
      return {};
    }
  };
  getMarkDownWithIdDoctor = (id: any): Promise<IdataRes<User>> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await User.findOne({
          where: { id },
          include: [
            {
              model: Markdown,
              attributes: {
                exclude: ["createdAt", "updatedAt"],
              },
            },
          ],
          attributes: {
            exclude: ["passWord", "createdAt", "updatedAt"],
          },
        });
        resolve({
          errCode: res ? 0 : 1,
          message: res ? "success" : "faild",
          data: res ? res : {},
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  creatBulkSchedualForDoctor = (data: any): Promise<IdataRes<any>> => {
    return new Promise(async (resolve, rejects) => {
      try {
        if (data && data.length > 0) {
          const res = await Schedual.bulkCreate(data);
          resolve({
            errCode: 0,
            message: "success",
            data: res,
          });
        }
      } catch (error) {}
    });
  };
  existingSchedual = async () => {
    try {
      const res = await Schedual.findAll({
        attributes: ["timeType", "doctorId", "date", "maxNumber"],
        raw: true,
      });

      return res;
    } catch (error) {}
  };
  findSchedualOfDoctor = async (doctorId: number, date: string) => {
    try {
      const res = await Schedual.findAll({
        include: [{ model: AllCodes, as: "schedualAllcodes" }],
        where: {
          doctorId,
          date,
        },
      });
      if (res) {
        return res;
      }
    } catch (error) {}
  };
  fetchDoctorWithAll = (id: any) => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await User.findOne({
          include: [
            {
              model: DoctorInfor,
              as: "doctorInfor",
              include: [
                { model: AllCodes, as: "price" },
                { model: AllCodes, as: "provice" },
                { model: AllCodes, as: "payment" },
              ],
            },
            { model: AllCodes, as: "position" },
          ],
          where: {
            id,
          },
          attributes: {
            exclude: ["passWord"],
          },
          raw: true,
          nest: true,
        });

        if (!res) {
          resolve({
            errCode: 1,
            message: `don't existed id`,
            data: "",
          });
          return;
        }
        resolve({
          errCode: 0,
          message: "success",
          data: res,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  setSchedualForPatient = (data: userType) => {
    return new Promise(async (resolve, reject) => {
      try {
        const existed = await User.findOne({
          where: { email: data.email },
        });
        if (existed) {
          resolve({
            errCode: 1,
            message: "existed",
          });
          return;
        }
        const { inforBooking, inforDoctor, calender, language, ...restObject } =
          data;
        const token = uuidv4();
        const { firstName, lastName, email } = restObject;
        if (!firstName || !lastName) return;
        const password = `${firstName.slice(0, 2)}${lastName.slice(0, 2)}123`;
        const res = await User.create({
          ...restObject,
          roleId: "R3",
          passWord: await hash(password),
          raw: true,
        });
        if (res) {
          const newRoom = new dbRoom({
            members: [res.id, inforDoctor?.id],
          });
          await newRoom.save();
          const link = `${process.env.BASEURL}verify?token=${token}&doctorId=${inforBooking?.doctorId}`;
          if (!inforBooking) return;
          let from = `WEB BOOKINGCARE WELLCOME GUEST <fdsafdsa@gmail.com>`;
          const mailOptions = {
            from: from,
            to: `${restObject.email}`,
            subject: "Confirm Booking Doctor",
            html:
              language == "en"
                ? `<h1>Wellcome you go to BOOKINGCARE WEB</h1>
            <div>
               <div>your information is : ${restObject.firstName} ${restObject.lastName}</div>
               <div>you set a booking with doctor , information' doctor including</div>
               <div>${inforDoctor?.position}, ${inforDoctor?.fullName}</div>
               <div>your calender is</div>
               <div>${calender?.time}</div>
               <div>if information above is true , you click at this link <a href='${link}'>onclick</a></div>
               <div>your account information is:</div>
               <div>account:${email}</div>
               <div>password:${password}</div>

            </div>
            `
                : `<h1>Chào mừng bạn đến vơí trang web Bookingcare</h1>
            <div>
               <div>thông tin của bạn là ${restObject.firstName} ${restObject.lastName}</div>
               <div>bạn đã đăh lịch với bác sĩ là:</div>
               <div>${inforDoctor?.position}, ${inforDoctor?.fullName}</div>
               <div>lịch của bạn là:</div>
               <div>${calender?.time}</div>
               <div>Nếu thông tin bên trên là chính xác thì bạn vui lòng click vào link này <a href='${link}'>onclick</a></div>
              <div>Thông tin tài khoản của bạn là:</div>
               <div>Tài Khoản:${email}</div>
               <div>Mật Khẩu:${password}</div>
            </div>
            `,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.error("Email sending failed:", error);
            } else {
              console.log("Email sent: " + info.response);
            }
          });
          await Booking.create({
            ...inforBooking,
            patientId: res.id,
            statusId: "S1",
            token,
          });
          resolve({
            errCode: 0,
            message: "set the calender successfully",
          });
        }
      } catch (error) {
        reject(error);
      }
    });
  };
  verifyBooking = (token: string, doctorId: number) => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res1 = await Booking.findOne({
          where: {
            token,
            doctorId,
            statusId: "S2",
          },
        });
        if (res1) {
          resolve({
            errCode: 1,
            message: "booking existed",
          });
          return;
        }
        const res = await Booking.findOne({
          where: {
            token,
            doctorId,
          },
        });
        if (res) {
          res.statusId = "S2";
          res.save();
        }
        resolve({
          errCode: 0,
          message: "booking success",
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
}
export default new ServiceUser();
