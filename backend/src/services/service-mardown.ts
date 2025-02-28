import { Idata, Iinfor, Imarkdown } from "../controllers/controller-markdown";
import Markdown from "../models/model-markdown";
import DoctorInfor from "../models/model-doctorInfor";

class ServiceMarkdown {
  static createMarkDown = (markdown: Imarkdown): Promise<Idata> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await Markdown.create({
          ...markdown,
        });
        resolve({
          data: res,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  static fetchOneMarkDown = (id: number): Promise<Idata> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const res = await Markdown.findOne({
          attributes: {
            exclude: ["createdAt", "updatedAt", "passWord"],
          },
          where: {
            doctorId: id,
          },
          raw: true,
        });
        const res1 = await DoctorInfor.findOne({
          attributes: {
            exclude: ["createdAt", "updatedAt"],
          },
          where: {
            doctorId: id,
          },
          raw: true,
        });

        resolve({
          errCode: 0,
          message: "success",
          data: res,
          data2: res1,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  static updateMarkDown = async (markdown: Imarkdown): Promise<Idata> => {
    return new Promise(async (resolve, rejects) => {
      try {
        const { doctorId, ...restObject } = markdown;
        const response = await Markdown.update(
          {
            ...restObject,
          },
          {
            where: {
              doctorId: doctorId,
            },
          }
        );
        resolve({
          data: response,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  static createInforDoctor = (infor: Iinfor): Promise<Idata> => {
    return new Promise(async (resolve, rejects) => {
      try {
        console.log(infor);
        const res = await DoctorInfor.create({
          ...infor,
        });
        resolve({
          data: res,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
  static updateInforDoctor = async (infor: Iinfor): Promise<Idata> => {
    console.log(infor);
    return new Promise(async (resolve, rejects) => {
      try {
        const { doctorId, ...restObject } = infor;
        const response = await DoctorInfor.update(
          {
            ...restObject,
          },
          {
            where: {
              doctorId: doctorId,
            },
          }
        );
        resolve({
          data: response,
        });
      } catch (error) {
        rejects(error);
      }
    });
  };
}
export default ServiceMarkdown;
