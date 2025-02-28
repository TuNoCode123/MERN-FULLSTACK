import { Request, Response } from "express";
import serviceSpeciality from "../services/service-speciality";
import ServiceClinic from "../services/service-clinic";
class ControllerClinic {
  static createNewClinic = async (req: Request, res: Response) => {
    try {
      const { images, ...restObjest } = req.body;
      const response = await ServiceClinic.createNewClinic(restObjest);
      return res.status(200).json(response);
    } catch (error) {}
  };
  static getAllClinic = async (req: Request, res: Response) => {
    try {
      const response = await ServiceClinic.fetchAllClinic();
      return res.status(200).json(response);
    } catch (error) {}
  };
  static getOneClinicByid = async (req: Request, res: Response) => {
    try {
      const id = req.query.id;
      if (!id)
        return res.status(200).json({
          errCode: 1,
          message: "missing input",
        });
      const response = await ServiceClinic.getOneClinicByid(id);
      return res.status(200).json(response);
    } catch (error) {}
  };
  static getAllDocorByIdViaSpeciality = async (req: Request, res: Response) => {
    try {
      const id = req.query.id;
      if (!id) {
        return res.status(200).json({
          errCode: 1,
          message: "missing input",
        });
      }
      const response = await serviceSpeciality.getAllDocorByIdViaSpeciality(id);
      return res.status(200).json(response);
    } catch (error) {}
  };
  static actionClinic = async (req: Request, res: Response) => {
    try {
      const response = await ServiceClinic.actionsClinic(req.body);
      return res.status(200).json(response);
    } catch (error) {}
  };
}
export default ControllerClinic;
