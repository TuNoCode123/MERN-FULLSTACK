import { Request, Response } from "express";
import ServicesDoctorInfor from "../services/service-inforDoctor";
class DoctorInfor {
  static getInforDoctor = async (req: Request, res: Response) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(404).json({
          errCode: 1,
          message: "empty input parameters",
        });
      }
      const response = await ServicesDoctorInfor.fetchInForDoctor(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(403).json({
        errCode: 1,
        message: "server internal error",
      });
    }
  };
  static getSchedualForDoctor = async (req: Request, res: Response) => {
    try {
      const id = req.body.id;
      if (!id) {
        return res.status(404).json({
          errCode: 1,
          message: "empty input parameters",
        });
      }
      const response = await ServicesDoctorInfor.getSchedualForDoctor(id);
      return res.status(200).json(response);
    } catch (error) {
      return res.status(403).json({
        errCode: 1,
        message: "server internal error",
      });
    }
  };
}
export default DoctorInfor;
