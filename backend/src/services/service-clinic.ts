import { promiseHooks } from "v8";
import Speciality from "../models/model-speciality";
import { resolveHostname } from "nodemailer/lib/shared";
import { error } from "console";
import { rejects } from "assert";
import DoctorInfor from "../models/model-doctorInfor";
import User from "../models/model-user";
import Markdown from "../models/model-markdown";
import inforDoctor from "../routes/infor-doctor";
import { actions } from "../utils/actions/actions";
import Clinic from "../models/model-clinic";

export interface Iclinic {
  contentHtml: string;
  nameClinic: string;
  contentText: string;
  cloudinaryUrls: string[];
}
class ServiceClinic {
  static createNewClinic = async (data: Iclinic) => {
    return new Promise(async (resolve, rejects) => {
      try {
        if (
          !data ||
          !data.contentHtml ||
          !data.contentText ||
          !data.nameClinic
        ) {
          resolve({
            errCode: 1,
            messahe: "missing imput",
          });
          return;
        }
        await Clinic.create({
          ...data,
          image: data.cloudinaryUrls[0],
        });
        resolve({
          errCode: 0,
          message: "success",
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  static fetchAllClinic = async () => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await Clinic.findAll();
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
  static getOneClinicByid = async (id: any) => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await Clinic.findOne({
          include: [
            {
              model: DoctorInfor,
              as: "clinicDoctor",
              include: [
                {
                  model: User,
                  as: "doctorInfor",
                  include: [{ model: Markdown }],
                  attributes: {
                    exclude: ["passWord"],
                  },
                },
              ],
            },
          ],
          where: {
            id,
          },
        });
        console.log(res);
        if (!res) {
          resolve({
            errCode: 1,
            message: "id is not existed",
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
  static getAllDocorByIdViaSpeciality = (id: any) => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await DoctorInfor.findAll({
          where: { specialityId: id },
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
  static actionsClinic = (data: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { id, action, cloudinaryUrls, ...restObject } = data;
        if (action == actions.update) {
          let response;
          if (cloudinaryUrls) {
            response = await Clinic.update(
              {
                ...restObject,
                image: cloudinaryUrls[0],
              },
              { where: { id } }
            );
          } else {
            response = await Clinic.update(
              {
                ...restObject,
              },
              { where: { id } }
            );
          }
          resolve({
            errCode: 0,
            message: "update success",
            data: response,
          });
          return;
        }
        if (action == actions.delete) {
          const response = await Clinic.destroy({ where: { id } });
          resolve({
            errCode: 0,
            message: "delete success",
            data: response,
          });
          return;
        }
        const response = await Clinic.findAll();
        resolve({
          errCode: 0,
          data: response,
        });
      } catch (error) {}
    });
  };
}
export default ServiceClinic;
