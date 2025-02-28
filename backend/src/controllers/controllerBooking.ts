import { Request, Response } from "express";
import ServiceBooking from "../services/service-booking";

class ControllerBooking {
  static confirmStreated = async (req: Request, res: Response) => {
    try {
      const { data, type, language } = req.body;
      const response = await ServiceBooking.confirmTreated(
        data,
        type,
        language
      );
      return res.status(200).json(response);
    } catch (error) {
      return res.status(403).json({
        errCode: 1,
        message: "server internal error",
      });
    }
  };
  static getBookingViaId = async (req: Request, res: Response) => {
    try {
      const response = await ServiceBooking.getBookingViaId(req.body.id);
      return res.status(200).json(response);
    } catch (error) {}
  };
}
export default ControllerBooking;
