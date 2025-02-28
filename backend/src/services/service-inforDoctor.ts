import AllCodes from "../models/model-allCode";
import Booking from "../models/model-booking";
import DoctorInfor from "../models/model-doctorInfor";
import User from "../models/model-user";

class ServicesDoctorInfor {
  static fetchInForDoctor = (id: any) => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await DoctorInfor.findOne({
          include: [
            { model: AllCodes, as: "price" },
            { model: AllCodes, as: "provice" },
            { model: AllCodes, as: "payment" },
          ],
          where: {
            doctorId: id,
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
  // getSchedualForDoctor
  static getSchedualForDoctor = (id: any) => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await Booking.findAll({
          include: [
            {
              model: User,
              as: "doctorBooking",
              attributes: [
                "email",
                "firstName",
                "lastName",
                "address",
                "phoneNumber",
                "gender",
              ],
              include: [
                {
                  model: AllCodes,
                  as: "genderAllcode",
                  attributes: ["valueEn", "valueVi"],
                },
              ],
            },
            {
              model: AllCodes,
              attributes: ["valueEn", "valueVi"],
            },
          ],
          where: {
            doctorId: id,
            statusId: "S2",
          },
        });
        resolve({
          errCode: 0,
          data: res,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
}
export default ServicesDoctorInfor;
