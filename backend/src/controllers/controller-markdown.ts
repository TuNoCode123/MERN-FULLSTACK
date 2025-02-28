import { Request, Response } from "express";
import ServiceMarkdown from "../services/service-mardown";

export interface Imarkdown {
  contentHtml: string;
  contentText: string;
  contentIntroHtml: string;
  conntentIntroText: string;
  doctorId?: number;
  clinicid?: number;
  specialityId?: number;
}
export interface Iinfor {
  doctorId: number;
  priceId: string;
  provinceId: string;
  paymentId: string;
  addressClinic?: string;
  nameClinic?: string;
  note?: string;
  count?: number;
  specialityId?: number;
}
export interface Idata {
  errCode?: number;
  message?: string;
  data: any;
  data2?: any;
}
class MarkdownController {
  static createMarkDownForDoctor = async (req: Request, res: Response) => {
    try {
      const mardown = req.body;
      const { action, dataInfor, ...restObject } = mardown;
      let response;
      if (action == "Edit") {
        response = await ServiceMarkdown.updateMarkDown(restObject);
      } else if (action == "Create") {
        response = await ServiceMarkdown.createMarkDown(restObject);
      }
      const res1 = await ServiceMarkdown.fetchOneMarkDown(restObject.doctorId);
      let response1;
      if (!res1.data2) {
        response1 = await ServiceMarkdown.createInforDoctor(dataInfor);
      } else {
        response1 = await ServiceMarkdown.updateInforDoctor(dataInfor);
      }
      return res.status(200).json({
        errCode: 0,
        message: "success",
        data: response,
        data1: response1,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static findOneMarkDown = async (req: Request, res: Response) => {
    try {
      const { id } = req.body;
      const response = await ServiceMarkdown.fetchOneMarkDown(id);
      return res.status(200).json({
        ...response,
      });
    } catch (error) {
      console.log(error);
    }
  };
  getDoctorInfor = async () => {};
}
export default MarkdownController;
