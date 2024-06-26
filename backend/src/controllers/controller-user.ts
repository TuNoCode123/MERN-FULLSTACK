import { Request, Response } from "express";
import serviceUser from "../services/service-user";
import reqUser from "../respitory/req-User";
import { userType } from "../utils/interfaces/interface-user";
import hash from "../utils/generall/hashPassWords";
import { error } from "console";
const createError = require("http-errors");
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
      const user: userType = req.body;
      if (!user.email || !user.passWord) {
        return res.status(200).json({
          errCode: 1,
          message: "emty email or passWord",
        });
      }
      const passWord: string = await hash(user.passWord!);
      const [userNew, created] = await serviceUser.createUser({
        ...user,
        passWord,
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
}
export default ControllerUser;
