import { Request, Response } from "express";
import serviceAuth from "../services/service-auth";
import serviceSpeciality from "../services/service-speciality";
class ControllerSpeciality {
  static createNewSpeciality = async (req: Request, res: Response) => {
    try {
      const { images, ...restObjest } = req.body;

      const response = await serviceSpeciality.createNewSpciality(restObjest);
      return res.status(200).json(response);
    } catch (error) {}
  };
  static getAllSpeciality = async (req: Request, res: Response) => {
    try {
      const response = await serviceSpeciality.fetchAllSpeciality();
      return res.status(200).json(response);
    } catch (error) {}
  };
  static getOneSpecialityByid = async (req: Request, res: Response) => {
    try {
      const id = req.query.id;
      if (!id)
        return res.status(200).json({
          errCode: 1,
          message: "missing input",
        });
      const response = await serviceSpeciality.getOneSpecialityByid(id);
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
  static actionSpeciality = async (req: Request, res: Response) => {
    try {
      const response = await serviceSpeciality.actionsSpecaility(req.body);
      return res.status(200).json(response);
    } catch (error) {}
  };
}
export default ControllerSpeciality;
