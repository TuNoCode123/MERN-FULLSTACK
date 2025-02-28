import { Request, Response } from "express";
import serviceUser, { Ischdual } from "../services/service-user";
import reqUser from "../respitory/req-User";
import { userType } from "../utils/interfaces/interface-user";
import hash from "../utils/generall/hashPassWords";
import { error } from "console";
const createError = require("http-errors");
require("dotenv").config;
interface typeController {
  updateUser: (req: Request, res: Response) => any;
  createUser: (req: Request, res: Response) => any;
  findAllUser: (req: Request, res: Response) => any;
  deleteUser: (req: Request, res: Response) => any;
}
class ControllerUser implements typeController {
  updateUser = async (req: Request, res: Response) => {
    const user: userType = req.body;
    const response = await serviceUser.updateUser(user);
    return res.status(200).json({
      message:
        response != "error" ? (response ? "success" : "failed") : "sever error",
      errCode: response != "error" ? (response ? 0 : 1) : 999,
    });
  };
  createUser = async (req: Request, res: Response) => {
    try {
      const { images, cloudinaryUrls, ...restObject } = req.body;
      if (!restObject.email || !restObject.passWord) {
        return res.status(200).json({
          errCode: 1,
          message: "emty email or passWord",
        });
      }
      const passWord: string = await hash(restObject.passWord!);
      const [userNew, created] = await serviceUser.createUser({
        ...restObject,
        passWord,
        image: cloudinaryUrls[0],
      });
      const status = userNew ? (created ? 200 : 200) : 500;
      return res.status(status).json({
        message: userNew
          ? created
            ? "success"
            : "email existed"
          : "server error",
        errCode: userNew ? (created ? 0 : 1) : 2,
      });
    } catch (error) {
    } finally {
    }
  };
  findAllUser = async (req: Request, res: Response) => {
    try {
      const response = await reqUser.findAllUser();
      res.status(200).json({
        errCode: response.length > 0 ? 0 : 1,
        message: response.length > 0 ? "success" : "faild",
        data: response.length > 0 ? response : [],
      });
    } catch (error) {}
  };
  deleteUser = async (req: Request, res: Response) => {
    const { id } = req.body;
    const response = await serviceUser.deleteUser(id);
    const status = response == "" ? 500 : response == "/" ? 404 : 200;
    return res.status(status).json({
      message:
        response == ""
          ? "server error"
          : response == "/"
          ? "email dont existed"
          : "success",
      errCode: response == "" ? 999 : response == "/" ? 1 : 0,
    });
  };
  findAlldoctor = async (req: Request, res: Response) => {
    try {
      const response = await serviceUser.getAllDoctor();
      if (Object.keys(response).length == 0) {
        return res.status(500).json({
          errCode: 999,
          message: "Server Internal Error",
          data: [],
        });
      }
      return res.status(200).json({
        errcode: 0,
        message: response.count ? "successs" : `don't doctor existed`,
        data: response.count ? response : [],
      });
    } catch (error) {}
  };
  findAlldoctorWithoutImage = async (req: Request, res: Response) => {
    try {
      const response = await serviceUser.getAllDoctorWithoutImage();
      if (Object.keys(response).length == 0) {
        return res.status(500).json({
          errCode: 999,
          message: "Server Internal Error",
          data: [],
        });
      }
      return res.status(200).json({
        errcode: 0,
        message: response.count ? "successs" : `don't doctor existed`,
        data: response.count ? response : [],
      });
    } catch (error) {}
  };
  fetchMarkDownWithId = async (req: Request, res: Response) => {
    try {
      const id = req?.query?.id;
      const response = await serviceUser.getMarkDownWithIdDoctor(id);
      return res.status(200).json({
        ...response,
      });
    } catch (error) {}
  };
  creatSchedualDoctor = async (req: Request, res: Response) => {
    try {
      const data: Ischdual[] = req.body.data;
      if (!data) return;
      if (data.length == 0) return;
      const tmp = data.map((item, index) => {
        let MAX_NUMBER = process.env.MAX_NUMBER;
        if (MAX_NUMBER) item.maxNumber = +MAX_NUMBER;
        return item;
      });
      const existing = await serviceUser.existingSchedual();
      if (!existing) {
        const response = await serviceUser.creatBulkSchedualForDoctor(tmp);
        return res.status(200).json({
          ...response,
        });
      }
      const restDataI: Ischdual[] = [];
      for (let i = 0; i < tmp.length; i++) {
        let rs = tmp[i];
        let q = 0;
        for (let j = 0; j < existing.length; j++) {
          let rs1 = existing[j];
          if (
            rs.timeType == rs1.timeType &&
            rs.doctorId == rs1.doctorId &&
            rs.date == rs1.date
          ) {
            q = 1;
            break;
          }
        }
        if (q == 0) {
          restDataI.push(rs);
        }
      }
      if (restDataI.length == 0) {
        return res.status(200).json({
          errCode: 1,
          message: "Schedual existed",
        });
      }
      const response = await serviceUser.creatBulkSchedualForDoctor(restDataI);
      return res.status(200).json({
        ...response,
      });
    } catch (error) {}
  };
  findSchedualOfDoctor = async (req: Request, res: Response) => {
    try {
      const { doctorId, date } = req.body;
      const response = await serviceUser.findSchedualOfDoctor(doctorId, date);
      return res.status(200).json({
        errCode: response ? 0 : 1,
        message: response ? "success" : "fail",
        data: response ? response : [],
      });
    } catch (error) {}
  };
  getDoctorWithAll = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      if (!id) {
        return res.status(404).json({
          errCode: 1,
          message: "empty input parameters",
        });
      }
      const response = await serviceUser.fetchDoctorWithAll(id);
      return res.status(200).json(response);
    } catch (error) {}
  };
  setSchedualForPatient = async (req: Request, res: Response) => {
    try {
      const { data } = req.body;

      const response = await serviceUser.setSchedualForPatient(data);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errCode: 1,
        message: "sever internal error",
      });
    }
  };
  verifyBooking = async (req: Request, res: Response) => {
    try {
      const { token, doctorId } = req.body;
      const response = await serviceUser.verifyBooking(token, doctorId);
      return res.status(200).json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        errCode: 1,
        message: "sever internal error",
      });
    }
  };
}
export default ControllerUser;
