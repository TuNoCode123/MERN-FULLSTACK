import { where } from "sequelize";
import AllCodes from "../models/model-allCode";
import Booking from "../models/model-booking";
import User from "../models/model-user";
import transporter from "../configs/configMailer";
import DoctorInfor from "../models/model-doctorInfor";

export interface IdataTreated {
  date: string;
  doctorId: number;
  patientId: number;
}
class ServiceBooking {
  static confirmTreated = (
    data: IdataTreated,
    type: string,
    language: string
  ) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!data || !data.date || !data.doctorId || !data.patientId) {
          resolve({
            errCode: 1,
            message: "missing input",
          });
          return;
        }
        if (type == "confirm") {
          await Booking.update({ statusId: "S3" }, { where: { ...data } });
          const response = await User.findOne({
            where: {
              id: data.patientId,
            },
          });
          if (!response) return;
          const link = `${process.env.BASEURL}payment?patientId=${data.patientId}&doctorId=${data.doctorId}`;

          let from = `WEB BOOKINGCARE WELLCOME GUEST <fdsafdsa@gmail.com>`;
          const mailOptions = {
            from: from,
            to: `${response.email}`,
            subject: "Payment",
            html:
              language == "en"
                ? `<h1>Thank you have used our website</h1>
            <div>
               <div>your information is :${response.firstName} ${response.lastName} </div>
               <div>You have to payment for your invoice</div>
               <div>if information above is true , you click at this link to pay <a href='${link}'>onclick</a></div>
            </div>
            `
                : `<h1>Cảm ơn bạn đã sử dụng website</h1>
            <div>
               <div>thông tin của bạn là :${response.firstName} ${response.lastName} </div>
               <div>Bạn phải thanh toán cho hóa đơn của bạn</div>
               <div></div>
               <div>Nếu thông tin bên trên là chính xác thì bạn vui lòng click vào link này để thanh toán <a href='${link}'>onclick</a></div>
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
        } else if (type == "delete") {
          await Booking.update({ statusId: "S4" }, { where: { ...data } });
        }
        resolve({
          errCode: 0,
          message: `${type} success`,
        });
      } catch (error) {
        reject(error);
      }
    });
  };
  static getBookingViaId = (id: number) => {
    return new Promise(async (resolve, reject) => {
      try {
        if (!id) {
          resolve({
            errCode: 1,
            message: "missing input",
          });
          return;
        }
        const res = await Booking.findAll({
          where: {
            patientId: id,
          },
        });
        resolve({
          errCode: 0,
          message: "success",
          data: res,
        });
      } catch (error) {}
    });
  };
  static CompletedBooking = async (doctorId: any, patientId: any) => {
    try {
      await Booking.update(
        {
          payment: true,
        },
        { where: { doctorId, patientId } }
      );
      return {
        errCode: 0,
        message: "success",
      };
    } catch (error) {}
  };
  static getCostOfDoctor = async (doctorId: any) => {
    try {
      const res = await DoctorInfor.findOne({
        include: [{ model: AllCodes, as: "price", attributes: ["valueEn"] }],
        where: {
          doctorId,
        },
        nest: true,
        raw: true,
      });
      return {
        errCode: 0,
        message: "success",
        data: res?.price.valueEn,
      };
    } catch (error) {}
  };
}
export default ServiceBooking;
